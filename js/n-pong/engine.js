 // shim layer with setTimeout fallback
 // currently no way to stop it... boo :(
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       || 
					window.webkitRequestAnimationFrame || 
					window.mozRequestAnimationFrame    || 
					window.oRequestAnimationFrame      || 
					window.msRequestAnimationFrame     || 
					function(/* function */ callback, /* DOMElement */ element){
						window.setTimeout(callback, 1000 / 60);
					};
})();

window.cancelAnimFrame = (function(){
	return  window.cancelAnimationFrame       || 
					window.webkitCancelAnimationFrame || 
					window.mozCancelAnimationFrame    || 
					function(/* function */ callback, /* DOMElement */ element){
						window.clearTimeout(callback, 1000 / 60);
					};
})();

// Inspired by Seth Ladd's demo code
Engine = function () {
	this.init();
};


Engine.prototype.init = function() {
		this.players = [];
		this.collisionManager = null;
		this.context = null;
		this.lastUpdateTimestamp = null;
		this.deltaTime = null;
		this.ball = new Ball();
		this.animationHandle = null;
		
		this.context = document.getElementById('gameboard').getContext("2d")
}
	
Engine.prototype.addPlayer = function(player) {
	var newPLayer = new Player( );
	
	var controller = new PlayerUserController( ); // Default to user controller.

	controller.init(this);
	newPlayer.init(player, this, controller, players.length+1);
	players.push(newPlayer);
	

}


Engine.prototype.removePlayer = function(player) {
	
}


// feel free to rename this...
Engine.prototype.getNumberOfSides = function() {
	return this.players.length;
}

Engine.prototype.checkCollisions = function(deltaTime) {
	this.context.fillStyle = 'blue';
	this.context.fillRect(10, 20, 200, 100);

}

Engine.prototype.loop = function() {
	var now = Date.now();
	this.deltaTime = now - this.lastUpdateTimestamp;
	this.checkCollisions(this.deltaTime);
	this.updateObjects(this.deltaTime);
	this.saveGameState();
	this.transmitGameState();
	this.lastUpdateTimestamp = now;
};

Engine.prototype.transmitGameState = function() {
	
};

Engine.prototype.updateObjects = function(dt) {
	// Server function
	this.ball.update(dt);
	for (var i=0;i<this.players.length; i++) {
		this.players[i].update();
	}
};

Engine.prototype.draw = function () {
	// Local function that draws on the client
};


/*
 - Starts the game loop from running 
*/
Engine.prototype.start = function () {
	console.log("starting game with ____ as host");
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
Engine.prototype.stop = function () {
	window.cancelAnimFrame(this.animationHandle);
};

Engine.prototype.saveGameState = function() {
	// only host should run this function
};
