console.log("in app.js ...");
/*************************************************************
 Class: Enemy
 Parameters: sprite, x location, y location, horizontal speed
 Description: Enemy class constructor that initializes our Enemy
              that players must avoid
**************************************************************/
var Enemy = function(sprite,x,y,speed) {
    //this = Object.create(Enemy.prototype);

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
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //console.log("Enemy dt is:" + dt);
       this.x = this.x + (dt * this.speed);

       //When enemy position is greater than the width of play area
       if(this.x > ctx.canvas.clientWidth){
           //Make sure the Enemy transitions smoothly from left and not just popping onto screen
           this.x = this.offscreenLeftPosStart; 
       }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    //console.log("******************** in Enemy.render *****************");
    //console.log("x pos is: "+ this.x);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y); 
}

Enemy.prototype.getRand = function(_rnd){
   var randomnumber=((Math.random() + 10) * _rnd);
   var randomnumber2=Math.ceil(randomnumber);
   //console.log("Random nummber: " + randomnumber);
   return randomnumber2;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    //this = Object.create(Player.prototype);

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.x = 430/2 - 10;
    this.y = 430;
  
}

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    //X Position
    var playerXpositionEndPointRight = Resources.canvas.width - Resources.get(this.sprite).width;

    //Y Position
    //console.log(Resources.get(this.sprite));
    var playerYpositionEndPointBottom = Resources.canvas.height - Resources.get(this.sprite).height;


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
    if(this.y < 0){
           this.y = -10; 
    }
}

Player.prototype.centerPlayer = function(_canvas, _res){
    console.log("In centerPlayer....");
    //var doc = window.document.getElementsByTagName('canvas');
    //console.log("The doc is: " + doc.canvas.width);
    console.log(_canvas.width);
    console.log("Sprite is: " + Resources.sprite);
    this.x = (_canvas.width - Resources.get(Resources.sprite).width)/2;

    //this.x = (505 - Resources.get(this.sprite)/2;
         
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    //console.log("X location of player is: " + this.x);
    //console.log("Y location of player is: " + this.y);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Handle Inputs
Player.prototype.handleInput = function(keyCode) {

    var spriteHeight = Resources.get(this.sprite).height;
    var spriteWidth = Resources.get(this.sprite).width;
    
    //Divide the spriteHeight and spriteWidth by 5 or more to make the pixel movments smaller
    //to make game more challenging
    if(keyCode === 'up'){
        this.y -= spriteHeight/10;
    }
    if(keyCode === 'down'){
        this.y += spriteHeight/10;
    }
    if(keyCode === 'left'){
        this.x -= spriteWidth;
    }
    if(keyCode === 'right'){
        this.x += spriteWidth;
    }

}

function checkCollisions(_enemy, _player, _res){
         //console.log("in checkCollisions");

         var enemy = _enemy[0];
         var player = _player;
         var enemyHeight = _res.get(enemy.sprite).height;
         var enemyWidth = _res.get(enemy.sprite).width;
         var playerHeight = _res.get(player.sprite).height;
         var playerWidth = _res.get(player.sprite).width;
         
         if(0){
         sleep(1000);
         console.log("Enemy x location is: " + enemy.x);
         console.log("Enemy y location is: " + enemy.y);

         console.log("Enemy height is: " + enemyHeight);
         console.log("Enemy width is: " + enemyWidth);
         console.log("Player height is: " + playerHeight);
         console.log("Player width is: " + playerWidth);

         console.log("Player x location is: " + player.x);
         console.log("Player y location is: " + player.y);
        } 

         if(enemy.x === player.y){
            console.log("COLLISION");
         }
         
        var collisionResult = (function(){
               !(
                ((enemy.y + a.height) < (b.y)) ||
                (a.y > (b.y + b.height)) ||
                ((a.x + a.width) < b.x) ||
                (a.x > (b.x + b.width))
                )
         });
         
    /*return !(
        ((enemy.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
        );*/

}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


var player = new Player();
//player.centerPlayer();
var enemy1  = new Enemy('images/enemy-bug.png',1,65, Enemy.prototype.getRand(15));
//var enemy2 = new Enemy('images/enemy-bug.png',1,130,Enemy.prototype.getRand(20));
//var enemy3 = new Enemy('images/enemy-bug.png',1,190,Enemy.prototype.getRand(25));
//var enemy4 = new Enemy('images/enemy-bug.png',1,240,Enemy.prototype.getRand(30));
//var allEnemies = [enemy1,enemy2,enemy3,enemy4];
var allEnemies = [enemy1];


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
