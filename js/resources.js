/* Resources.js
 * This is simply an image loading utility. It eases the process of loading
 * image files so that they can be used within your game. It also includes
 * a simple "caching" layer so it will reuse cached images if you attempt
 * to load the same image multiple times.
 */
(function() {
    console.log("In resources.js!");
    var resourceCache = {};
    var loading = [];
    var readyCallbacks = [];

    /****************************************************************************
     * This is the publicly accessible image loading function. It accepts
     * an array of strings pointing to image files or a string for a single
     * image. It will then call our private image loading function accordingly.
     ***************************************************************************/
    function load(urlOrArr) {
        if(urlOrArr instanceof Array) {
            /* If the developer passed in an array of images
             * loop through each value and call our image
             * loader on that image file
             */
            //console.log("First index is : " + urlOrArr[0]);
            //For each element in array call the callback function(url) and call _laod function
            urlOrArr.forEach(function(url) {
                             _load(url);
                             //console.log("url value is : " + url);
                             });

        } else {
            /* The developer did not pass an array to this function,
             * assume the value is a string and call our image loader
             * directly.
             */
            _load(urlOrArr);
        }
    } //end of function load(urlOrArr) {


    /***************************************************************************
     * This is our private image loader function, it is
     * called by the public image load(urlOrArr) function.
     ***************************************************************************/
    function _load(url) {
        console.log("in _load ");
        if(resourceCache[url]) {
            /* If this URL has been previously loaded it will exist within
             * our resourceCache array. Just return that image rather
             * re-loading the image.
             */
            return resourceCache[url];
        } else {
            /* This URL has not been previously loaded and is not present
             * within our cache; we'll need to load this image.
             */
            var img = new Image();
            img.onload = function() {
                /* Once our image has properly loaded, add it to our cache
                 * so that we can simply return this image if the developer
                 * attempts to load this file in the future.
                 */
                resourceCache[url] = img;

                //console.log("resourceCache["+url+"] is :" + img);
                /* Once the image is actually loaded and properly cached,
                 * call all of the onReady() callbacks we have defined.
                 */
                if(isReady()) {
                    console.log("In isReady");

                    readyCallbacks.forEach(function(func)
                    {
                      console.log("func is: "+ eval(func));
                      func();
                    });
                }
            };

            /* Set the initial cache value to false, this will change when
             * the image's onload event handler is called. Finally, point
             * the images src attribute to the passed in URL.
             */
            resourceCache[url] = false;
            img.src = url;
        }
    }// end of function _load(url) {

    /***********************************************************************
     * This is used by developer's to grab references to images they know
     * have been previously loaded. If an image is cached, this functions
     * the same as calling load() on that URL.
     **********************************************************************/
    function get(url) {
        //console.log("calling get with parameter: " + url);
        return resourceCache[url];
    }

    /* This function determines if all of the images that have been requested
     * for loading have in fact been completed loaded.
     */
    function isReady() {
        var ready = true;
        for(var k in resourceCache) {
            //console.log("value k is: " + k);
            //console.log(" in isReady and k is :" + resourceCache.hasOwnProperty(k));
            if(resourceCache.hasOwnProperty(k) && !resourceCache[k]) {
                ready = false;
            }
        }
        //console.log("ready is: "+ ready);
        return ready;
    }

    /* This function will add a function to the callback stack that is called
     * when all requested images are properly loaded.
     */
    function onReady(func) {
        readyCallbacks.push(func);
    }

    /* This object defines the publicly accessible functions available to
     * developers by creating a global Resources object.
     * Add a property called Resources to global window object to be use in
     * engine.js
     */
     console.log("window.Resources is creating.");
    window.Resources = {
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    };
}());
