//console.log("in app.js ...");

/*************************************************************
 Class: Enemy
 Parameters: sprite, x location, y location, horizontal speed
 Description: Enemy class constructor that initializes our Enemy
              that players must avoid
**************************************************************/

var Enemy = function(sprite,x,y,speed) {
    //this = Object.create(Enemy.prototype); //returns "this" which we can add and set properties for our class

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.speed = speed;
    this.offscreenLeftPosStart = -100;
}

/***********************************************************************
    Method: update
    Description: Update the enemy's position, required method for game
    Parameter: dt, a time delta between ticks
    Called by: updateEntities function in engine.js script
************************************************************************/

Enemy.prototype.update = function(dt) {
    // console.log("Enemy dt is:" + dt);

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

       this.x = this.x + (dt * this.speed);

       //When enemy position is greater than the width of play area set left side start of image
       if(this.x > ctx.canvas.clientWidth){
           //Make sure the Enemy transitions smoothly from left and not just popping onto screen
           this.x = this.offscreenLeftPosStart; 
       }
}

/***********************************************************************
    Method: render
    Description: Draw the Enemy on the screen. Required method for game
    Parameter: none
    Called by: renderEntities function in engine.js script
************************************************************************/

Enemy.prototype.render = function() {
    //console.log("******************** in Enemy.render *****************");
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y); 
}

/***********************************************************************
    Method: getRand
    Description: Create a random number
    Parameter: seed value
    Called by: enemy object 
************************************************************************/

Enemy.prototype.getRand = function(_rnd){
   var randomnumber=((Math.random() + 10) * _rnd);
   var randomnumber2=Math.ceil(randomnumber);
   return randomnumber2;
};


/*************************************************************
 Class: Player
 Parameters: none
 Description: Player class constructor that initializes our
              player .This class requires an update(), render() 
              and a handleInput() method.
 Called by: app.js
**************************************************************/

var Player = function() {
    //console.log("In Player constructor");
    //this = Object.create(Player.prototype);

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.sprite = 'images/char-boy2.png';
    this.x = 430/2 - 10; //position player sprite horizontally
    this.y = 606 - Math.ceil((85 + (85/2))); //position player sprite vertically
    this.boundBoxVar = 52;

    //this.gameOver = 'images/game-over.png';
    //this.playerHeight = Resources.get(this.sprite).height;
  
}

/***********************************************************************
    Method: update
    Description: Update the player's position, required method for game
    Parameter: dt(delta tick) a time delta between ticks
    Called by: updateEntities function in engine.js script
************************************************************************/

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    //X Position
    var playerXpositionEndPointRight = Resources.canvas.width - Resources.get(this.sprite).width;

    //Y Position
    var height = Resources.get(this.sprite).height;
    var playerYpositionEndPointBottom = Resources.canvas.height - Math.ceil((height + (height/2)));
    //var boundBoxVar = 52;

    //To keep the player from moving of the right side of screen subtract the width of image from the width of canvas 
    //which will set the end point on right side
    //When player reaches that x position set the current player position to same value to give appearance
    //that player can't go off edge
    if(this.x > playerXpositionEndPointRight){
           this.x = playerXpositionEndPointRight; 
    }
    if(this.x < 0.5){
           this.x = 0.5; 
    }

    if(this.y > playerYpositionEndPointBottom){
           this.y = playerYpositionEndPointBottom; 
    }

    //52px places the position of the player just above the bounding box of the enemy 
    //once the player reaches the water this prevents contact due to space limits of bounding box and position of enemy
    if(this.y < this.boundBoxVar){
           this.y = 51; 
    }
}

/***********************************************************************
    Method: render
    Description: Draw the Player on the screen. Required method for game
    Parameter: none
    Called by: renderEntities function in engine.js script
************************************************************************/

Player.prototype.render = function() {
    //console.log("X location of player is: " + this.x);
    //console.log("Y location of player is: " + this.y);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/***********************************************************************
    Method: handleInput
    Description:Handle player keyboard Inputs
    Parameter: keyCode
    Called by: addEventListener function in app.js script
************************************************************************/

Player.prototype.handleInput = function(keyCode) {

    var spriteHeight = Resources.get(this.sprite).height;
    var spriteWidth = Resources.get(this.sprite).width;
    var step = 2; //the amount of movement up or down

    //Divide the spriteHeight by step to give player smaller movements vertically 
    if(keyCode === 'up'){
        this.y -= spriteHeight/step;
    }
    if(keyCode === 'down'){
        this.y += spriteHeight/step;
    }
    if(keyCode === 'left'){
        this.x -= spriteWidth;
    }
    if(keyCode === 'right'){
        this.x += spriteWidth;
    }
     
    //If player hits the water set to true to put player in start position 
    //in the water if player collides with a enemy on the way back to grass 
    if(this.y <= this.boundBoxVar){
        Player.WATER = true;
    }
    
    //If player hasn't hit the water set to false to put player in start position 
    //in the in grass until the player hits the water
    if(this.y >= 480){
        Player.WATER = false;
    }



}


/***********************************************************************
    Method: checkCollisions
    Description:Handle collisions between player and enemy
    Parameter: enemy obj, player obj and res object
    Called by: update function in engine.js script
************************************************************************/

function checkCollisions(_enemy, _player, _res){
         //console.log("in checkCollisions");
         //Enemy = a
         //Player  = b
         
         var enemy;
         var player = _player;
         var enemyHeight;
         var enemyWidth;
         var playerHeight;
         var playerWidth;
         var enemyLength = _enemy.length;

         var coll1;
         var coll2;
         var coll3;
         var coll4;

         var collisionResult;
         
         //Loop through enemy array and calculate 
         //collision for each enemy against the player
         for(i = 0; i < enemyLength; i++){
            enemy = _enemy[i];
            enemyHeight = _res.get(enemy.sprite).height;
            enemyWidth = _res.get(enemy.sprite).width;
            playerHeight = _res.get(player.sprite).height;
            playerWidth = _res.get(player.sprite).width;

            //Collision algorithm provide by
            //http://stackoverflow.com/questions/2440377/javascript-collision-detection
            coll1 = (enemy.y + enemyHeight) < player.y;
            coll2 = enemy.y > (player.y + playerHeight);
            coll3 = (enemy.x + enemyWidth) < player.x;
            coll4 = enemy.x > (player.x + playerWidth);

            //Short circuit on true value to signal no collision
            //If no short circuit than there is a collison on one of the enemies
            //so turn the result to true
            collisionResult = !(coll1 || coll2 || coll3 || coll4);

            if(collisionResult){
               reset();
            }

         }
         
        //Debugger info
         if(0){
            sleep(1200);
            console.log("coll1 is : " + coll1);
            console.log("coll2 is : " + coll2);
            console.log("coll3 is : " + coll3);
            console.log("coll4 is : " + coll4);

            console.log("Enemy x location is: " + enemy.x);
            console.log("Enemy y location is: " + enemy.y);

            console.log("Enemy height is: " + enemyHeight);
            console.log("Enemy width is: " + enemyWidth);
            console.log("Player height is: " + playerHeight);
            console.log("Player width is: " + playerWidth);

            console.log("Player x location is: " + player.x);
            console.log("Player y location is: " + player.y);
         }   

        //Enemy = a
        //Player  = b

}

/***********************************************************************
    Method: reset
    Description:  If player reaches water and tries to get back to grass and collides
                  reset the player to water else position him back to grass starting
                  point. The default x position of player never changes
    Parameter: None
    Called by: checkCollision function when player collides with enemy
************************************************************************/

function reset(){
    //console.log("Player.WATER in reset is: " + Player.WATER);
    if(Player.WATER === true){
        player.y = 52; //position player in water
    }else{
        player.y = 480;//position player in grass
    }
    player.x = 430/2 - 10;
}


//Sleep script http://www.phpied.com/sleep-in-javascript/
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


// Instantiate 4 enemy objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();
var enemy1  = new Enemy('images/enemy-bug2.png',1,140,Enemy.prototype.getRand(15));
var enemy2 = new Enemy('images/enemy-bug2.png',1,220,Enemy.prototype.getRand(20));
var enemy3 = new Enemy('images/enemy-bug2.png',1,300,Enemy.prototype.getRand(25));
var enemy4 = new Enemy('images/enemy-bug2.png',1,380,Enemy.prototype.getRand(30));
var allEnemies = [enemy1,enemy2,enemy3,enemy4];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/*
The next few lines about clicks are for the Collecting Click Locations quiz in Lesson 2.
*/
/*clickLocations = [];

function logClicks(x,y) {
  clickLocations.push(
    {
      x: x,
      y: y
    }
  );
  console.log('x location: ' + x + '; y location: ' + y);
}

$(document).click(function(loc) {
  logClicks(loc.pageX, loc.pageY);
});*/
