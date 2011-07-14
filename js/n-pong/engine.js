// Inspired by Seth Ladd's demo code
Engine = function () {
	
};


Engine.prototype.init = function() {
		this.players = [];
		this.collisionManager = null;
		this.context = null;
		this.lastUpdateTimestamp = null;
		this.deltaTime = null;
		this.ball = null;
<<<<<<< HEAD
=======
		this.animationHandle = null;
>>>>>>> f1de96db3cf498ba2143ac416e2ae274b992d648
	}
	
Engine.prototype.addPlayer = function(player) {
	var newPLayer = new Player( );

	var controller = new PlayerUserController( ); // Default to user controller.

	controller.init(this);
	newPlayer.init(player, this, controller );
	
	players.push( newPlayer );
}


Engine.prototype.removePlayer = function(player) {
	
}


// feel free to rename this...
Engine.prototype.getNumberOfPlayers = function() {
	return this.players.length;
}

Engine.prototype.checkCollisions = function(deltaTime) {
	
}

Engine.prototype.loop = function() {
	var now = Date.now();
	this.deltaTime = now - this.lastUpdateTimestamp;
	this.checkCollisions(deltaTime);
	this.updateObjects(deltaTime);
<<<<<<< HEAD
	this.drawObjects();
=======
>>>>>>> f1de96db3cf498ba2143ac416e2ae274b992d648
	this.saveGameState();
	this.transmitGameState();
	this.lastUpdateTimestamp = now;
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
	console.log("starting game with ____ as host")
	this.lastUpdateTimestamp = Date.now()
	var self = this
	(function gameLoop() {
			self.loop();
<<<<<<< HEAD
			window.requestAnimationFrame(gameLoop, self.ctx.canvas);
=======
			this.animationHandle = window.requestAnimationFrame(gameLoop, self.ctx.canvas)
>>>>>>> f1de96db3cf498ba2143ac416e2ae274b992d648
	})();
};

/*
 - Stops the game loop from running 
*/
Engine.prototype.stop = function () {
	window.cancelRequestAnimationFrame(this.animationHandle);
};

Engine.prototype.saveGameState = function() {
	// only host should run this function
};
