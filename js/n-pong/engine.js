 // shim layer with setTimeout fallback
 // currently no way to stop it... boo :(
window.requestAnimFrame = (function() {
	return  window.requestAnimationFrame       || 
					window.webkitRequestAnimationFrame || 
					window.mozRequestAnimationFrame    || 
					window.oRequestAnimationFrame      || 
					window.msRequestAnimationFrame     || 
					function(/* function */ callback, /* DOMElement */ element){
                        window.setTimeout(callback, 1000 / 60);
					};
})();

hangout.pong.Engine = function() {
	this.init();
};

hangout.pong.Engine.prototype.init = function() {
  this.players = [];
  this.collisionManager = null;
  this.lastUpdateTimestamp = null;
  this.deltaTime = null;
  this.animationHandle = null;
  this.running = null;
  this.status = document.getElementById('status');
  this.canvas = document.getElementById('gameboard');
  this.context = this.canvas.getContext("2d");

  this.ball = new hangout.pong.Ball(this);

  this.addPlayer('john');
  this.addPlayer('james');
  this.addPlayer('mohamed');
  this.addPlayer('kaleb');
  this.addPlayer('kris');
  this.addPlayer('bob');
};

hangout.pong.Engine.prototype.drawBackground = function() {

};

hangout.pong.Engine.prototype.addPlayer = function(player) {
	var controller = new hangout.pong.PlayerControllerRandom(this); // Default to user controller.

	var newPlayer = new hangout.pong.Player(player, this, controller);
	// 
	this.players.push(newPlayer);
	for (var i = 0; i < this.players.length; i++) {
		this.players[i].init(i);		
	}	
};

hangout.pong.Engine.prototype.removePlayer = function(player) {
	
};


// feel free to rename this...
hangout.pong.Engine.prototype.getNumberOfSides = function() {
	return this.players.length;
};

hangout.pong.Engine.prototype.checkCollisions = function(deltaTime) {

};

hangout.pong.Engine.prototype.loop = function() {
	if (this.running) {
		var now = Date.now();
		this.deltaTime = now - this.lastUpdateTimestamp;
		this.updateObjects(this.deltaTime);
		this.checkCollisions(this.deltaTime);
		this.saveGameState();
		this.transmitGameState();
		this.draw();
		this.lastUpdateTimestamp = now;
	}
};

hangout.pong.Engine.prototype.transmitGameState = function() {
	
};

hangout.pong.Engine.prototype.updateObjects = function(dt) {
	// Server function
	this.ball.update(dt);
	for (var i = 0; i < this.players.length; i++) {
		this.players[i].update(dt);
	}
};

hangout.pong.Engine.prototype.checkCollisions = function(dt) {
	//TODO: keeping this very simple for this game....
	for (var i = 0; i < this.players.length; i++) {
		var colInfo = this.ball.shape.isIntersecting(this.players[i].shape);
		if (colInfo){
			// TODO: Finish this, move to an appropriate place
			var vDotp = this.ball.vel.x * -colInfo.perp.x + this.ball.vel.y * -colInfo.perp.y;
			var pDotp = colInfo.perp.x * colInfo.perp.x + colInfo.perp.y * colInfo.perp.y;
			var reflection = { 
        x: 2 * vDotp / pDotp * colInfo.perp.x - this.ball.vel.x,
        y: 2 * vDotp / pDotp * colInfo.perp.y - this.ball.vel.y
      };
			this.ball.vel.reflection(colInfo.perp.scale(-1));
		}
	}
};

hangout.pong.Engine.prototype.draw = function() {
	// Local function that draws on the client
	var ctx = this.context;
	this.canvas.width = this.canvas.width;
  ctx.fillStyle = 'black';
  this.drawBackground();
  this.ball.draw(ctx);
  for (var i = 0; i < this.players.length; i++) {
		this.players[i].draw(ctx);
  }
};

/*
 - Starts the game loop from running 
*/
hangout.pong.Engine.prototype.start = function() {
	console.log("starting game with ____ as host");
	this.running = true;
	this.lastUpdateTimestamp = Date.now()
	var self = this;
	(function gameLoop() {
			self.loop();
			this.animationHandle = window.requestAnimFrame(gameLoop, self.context.canvas);
	})();
};

/*
 - Stops the game loop from running 
*/
hangout.pong.Engine.prototype.pause = function() {
	this.running = false;
};

hangout.pong.Engine.prototype.saveGameState = function() {
	// only host should run this function
};
