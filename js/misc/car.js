
var area = (function() {
		var width = 3;
		var height = 2;
		return width * height;

}());

var area1 = function() {
		var width = 3;
		var height = 2;
		return width * height;

};


//Check the constructor property of the calling class
var printObj = function(obj){
	if(obj.constructor === Van){
	  console.log("A Van object!");
    }
	if (obj.constructor === Car) {
	  console.log("A Car object!");	
	}
};

//Car constructor super class
var Car = function(loc){
	//this = Object.create(Car.prototype); -- this line is inserted in all constructors by default but not seen.
	console.log("In Car constructor");
	//console.log("this.loc is: " + loc);
    this.loc = loc;
};

Car.prototype.myValue = function(){console.log("The value is: " + this.loc);};
//Add a move method using prototype chaining to Car class which has access to "this"
//Any methods you want shared go on the .prototype property of the constructor function Car
Car.prototype.move = function(){
  this.loc++;  
};



/******************************************************************
 Van constructor
 Inherits from Car class
******************************************************************/
var Van = function(loc){
	console.log("In Van constructor");
	//Bind Van to car using call method
	Car.call(this,loc); //Run Van object in same context as Car using Van reference(this) and param loc. Basically initialize Car constructor with Van data
	//printObj(this); //this = Object.create(Van.prototype) which is provided by the JS engine and contains the contructor property of name of class type
};

printObj(this); //this = Object.create(Van.prototype) which is provided by the JS engine and contains the contructor property of name of class type

Van.prototype = Object.create(Car.prototype);//Gain lookup access to Car Parent class instance methods by inheritance
printObj(Van.prototype); //Van.prototype is "Van"

Van.prototype.constructor = Van; //we did this because the .prototype object was overwritten with create call above, so we need to set back the constructor property for Van

//Add Van specific methods
Van.prototype.grab = function(){console.log("in grab!");};


//var zed = new Car(3);
//zed.move();


//Start of running code
var amy = new Van(90); // Call Van constructor, amy is a Van, Van is a Car so amy is in Car's prototype chain
amy.myValue();
amy.move();
amy.grab();

console.log(area);