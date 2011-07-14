// Inspired by Seth Ladd's demo code

function Engine() {
	var self = this;
	self.initialize = function() {
		this.players = [];
		this.collisionManager = null;
		this.context = null;
		this.lastUpdateTimestamp = null
		this.deltaTime = null
		this.ball = null
	}
	
	self.addPlayer = function(player) {
		
	}
	
	self.removePlayer = function(player) {
		
	}
	
	self.updateObjects = function() {
		
	}
	
	self.checkCollision = function() {
		
	}
	
	self.loop = function() {
		var now = Date.now()
		this.deltaTime = now - this.lastUpdateTimestamp;
		this.checkCollisions();
		this.updateObjects()
		this.drawObjects()
		this.saveGameState();
		this.transmitGameState();
		this.lastUpdateTimestamp = now
	}	
	
	self.updateObjects = function() {
		// Server function
		this.ball.update()
		for (var i=0;i<this.players.length; i++) {
			this.players[i].update();
		}
	}
	
	self.draw = function () {
		// Local function that draws on the client
	}
	
	self.start = function () {
		console.log("starting game with ____ as host")
		this.lastUpdateTimestamp = Date.now()
		var self = this
		(function gameLoop() {
				self.loop();
				requestAnimationFrame(gameLoop, self.ctx.canvas
		})();
	}
	
	self.saveGameState = function() {
		// only host should run this function
	}
	
	self.initialize()
}
