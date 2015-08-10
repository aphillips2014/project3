
/*************************************************************
  Class: Enemy
  Parameters: sprite, x location, y location, horizontal speed
  Description: Enemy class constructor that initializes our Enemy
               that players must avoid
**************************************************************/

var Enemy = function(sprite,x,y,speed,bugName) {
      //Member Data
      this.x = x;
      this.y = y;
      this.sprite = sprite;
      this.speed = speed;
      this.offscreenLeftPosStart = -175;
      this.bugName = bugName;
};

/***********************************************************************
  Method: Enemy.update
  Description: Update the enemy's position, required method for game
  Parameter: dt, a time delta between ticks
  Called by: updateEntities function in engine.js script
************************************************************************/

Enemy.prototype.update = function(dt) {
      // You should multiply any movement by the dt parameter
      // which will ensure the game runs at the same speed for all computers.

      this.x = this.x + (dt * this.speed);

      //When enemy position is greater than the width of play area set
      //left side start of image and mkeake sure the Enemy transitions
      //smoothly from left and not just popping onto screen

      if (this.x > ctx.canvas.clientWidth){
          this.x = this.offscreenLeftPosStart;
      }
};

/***********************************************************************
  Method: Enemy.render
  Description: Draw the Enemy on the screen. Required method for game
  Parameter: none
  Called by: renderEntities function in engine.js script
************************************************************************/

Enemy.prototype.render = function() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/***********************************************************************
  Method: Enemy.getRand
  Description: Create a random number
  Parameter: seed value
  Called by: enemy objec   t
************************************************************************/

Enemy.prototype.getRand = function(rnd){
      var randomnumberSt = ((Math.random() + 20) + (Math.random() + 10)) * rnd/2.5;
      return randomnumberSt;
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
      //this = Object.create(Player.prototype);
      //Member data
      this.sprite = 'images/char-boy2.png';
      this.x = 430/2 - 10; //position player sprite horizontally
      this.y = 606; //position player sprite vertically
      this.endImage = 'images/game-over.png';
};

/***********************************************************************
  Method: Player.update
  Description: Update the player's position, required method for game
  Parameter: dt(delta tick) a time delta between ticks
  Called by: updateEntities function in engine.js script
************************************************************************/

Player.prototype.update = function(dt) {
      // You should multiply any movement by the dt parameter
      // which will ensure the game runs at the same speed for
      // all computers.

      //msgStat = window.document.getElementById('msg');
      //msgStat.textContent = this.x;

      //X Position
      var playerXpositionEndPointRight = Resources.canvas.width - Resources.get(this.sprite).width;
      var playerXpositionEndPointLeft = 0;
      //Y Position
      var height = Resources.get(this.sprite).height; //get the sprite name for this player and get height. Looks in resourceCache
      var playerYpositionEndPointBottom = Resources.canvas.height - Math.ceil((height + (height/1.5)));

      //To keep the player from moving of the right side of screen subtract the width of image from the width of canvas
      //which will set the end point on right side
      //When player reaches that x position set the current player position to same value to give appearance
      //that player can't go off edge
      if (this.x > playerXpositionEndPointRight){
          this.x = playerXpositionEndPointRight;
      }

      if (this.y > playerYpositionEndPointBottom){
          this.y = playerYpositionEndPointBottom;
      }

      if (this.x < playerXpositionEndPointLeft){
          this.x = playerXpositionEndPointLeft;
      }

      if ((this.y < 52) || (this.y === 52)) {
          score += 10;
          player.reset("Congratulations you made it to the WATER!!");
      }


};

/***********************************************************************
  Method: Player.render
  Description: Draw the Player on the screen. Required method for game
  Parameter: none
  Called by: renderEntities function in engine.js script
************************************************************************/

Player.prototype.render = function() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/***********************************************************************
  Method: Player.handleInput
  Description:Handle player keyboard Inputs
  Parameter: keyCode
  Called by: addEventListener function in app.js script
************************************************************************/

Player.prototype.handleInput = function(keyCode) {

      var spriteHeight = Resources.get(this.sprite).height;
      var spriteWidth = Resources.get(this.sprite).width;

      if (keyCode === 'up'){
          this.y -= spriteHeight;
          //msgStat = window.document.getElementById('msg');
          //msgStat.textContent = this.y;
      }

      if (keyCode === 'down'){
          this.y += spriteHeight;
          //msgStat = window.document.getElementById('msg');
          //msgStat.textContent = this.y;
      }

      if (keyCode === 'left'){
          this.x -= spriteWidth;
          //msgStat = window.document.getElementById('msg');
          //msgStat.textContent = this.x;
      }

      if (keyCode === 'right'){
          this.x += spriteWidth;
          //msgStat = window.document.getElementById('msg');
          //msgStat.textContent = this.x;
      }

      //TODO: Incorporate space bar to un pause game
      /*
      if (keyCode === 'spacebar'){
          var now = Date.now();
          dt = (now - lastTime) / 1000.0;
          update(dt);
      }
      */

};

/***********************************************************************
  Method: Player.reset
  Description:  If player reaches water and tries to get back to grass and collides
                  reset the player to water else position him back to grass starting
                  point. The default x position of player never changes
  Parameter: None
  Called by: checkCollision function when player collides with enemy
************************************************************************/

Player.prototype.reset = function(message){

      //position player in grass and center player
      player.y = 480;//position player in grass
      player.x = 430/2 - 10;
      enemy1.x = -280;
      enemy2.x = -280;
      enemy3.x = -280;

      msgStat = window.document.getElementById('status');
      msgStat.textContent = message;
      msgScore = window.document.getElementById('score');
      msgScore.textContent = score;
      //ctx.drawImage(Resources.get(this.endImage),0,0);


};

/***********************************************************************
  Function: checkCollisions
  Description:Handle collisions between player and enemy
  Parameter: enemy obj, player obj and res object
  Called by: update function in engine.js script
************************************************************************/

function checkCollisions(enemyCol, playerCol, res, doc){
      //console.log("in checkCollisions");
      //Enemy = a
      //Player  = b

      //Enemy collision variables
      var enemy;
      var enemyHeight;
      var enemyWidth;
      var enemyLength = enemyCol.length;

      //Player collision variables
      var player = playerCol;
      var playerHeight;
      var playerWidth;

      //Collision variables
      var coll1;
      var coll2;
      var coll3;
      var coll4;
      var collisionResult;

      //Loop through array of Enemy objects and calculate
      //collision for each enemy against the player
      for (var i = 0; i < enemyLength; i++){
          enemy = enemyCol[i];
          enemyHeight = res.get(enemy.sprite).height;
          enemyWidth = res.get(enemy.sprite).width;
          playerHeight = res.get(player.sprite).height;
          playerWidth = res.get(player.sprite).width;

          //Collision algorithm provide by
          //http://stackoverflow.com/questions/2440377/javascript-collision-detection
          coll1 = (enemy.y + enemyHeight/3) < player.y;
          coll2 = enemy.y > (player.y + playerHeight/3);
          coll3 = (enemy.x + enemyWidth/3) < player.x;
          coll4 = enemy.x > (player.x + playerWidth/3);

          //Short circuit on true value to signal no collision
          //If no short circuit than there is a collison on one of the enemies
          //so turn the result to true
          collisionResult = !(coll1 || coll2 || coll3 || coll4);

          if (collisionResult){
              score -= 5;
              player.reset("CRASH!!! You have collided with " + enemy.bugName + " the bug!");
              //doc.createElement('div');
              //ctx.drawImage(Resources.get(this.endImage),0,0);

          }
      }
}



/*****************************************************************************
 Sleep script http://www.phpied.com/sleep-in-javascript/
******************************************************************************/

function sleep(milliseconds) {
      var start = new Date().getTime();

      for (var i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > milliseconds){
              break;
          }
      }
}

// Instantiate global player object accessible via window object
// Instantiate 4 global enemy objects accessible via window object
// Place all enemy objects in an global array called allEnemies accessible via window object
// Place the player object in a variable called player
      var msgStat, msgScore
      var score = 0;
      var player = new Player();
      var enemy1  = new Enemy('images/enemy-bug2.png',1,120,Enemy.prototype.getRand(15)*1.3, "Larry");
      var enemy2 = new Enemy('images/enemy-bug2.png',1,225,Enemy.prototype.getRand(20)*1.5, "Moe");
      var enemy3 = new Enemy('images/enemy-bug2.png',1,320,Enemy.prototype.getRand(25)*2, "Curly");
      var allEnemies = [enemy1,enemy2,enemy3];


// This listens for key presses on the web page and sends the keys to your
      document.addEventListener('keyup', function(e) {
      var allowedKeys = {
        32: 'spacebar',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
      };

      player.handleInput(allowedKeys[e.keyCode]);

});