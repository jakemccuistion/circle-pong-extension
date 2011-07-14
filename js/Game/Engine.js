// Inspired by Seth Ladd's demo code

var Engine = Class.create({
	initialize: function() {
		this.players = [];
		this.collisionManager = null;
		this.context = null;
		this.lastUpdateTimestamp = null
		this.deltaTime = null
		this.ball = null
	},
	addPlayer: function (player) {
	
	},
	
	removePlayer: function (player) {
		
	},
	
	updateObjects: function() {
	
	},
	
	checkCollisions: function () {
		
	},
	
	loop: function() {
		var now = Date.now()
		this.deltaTime = now - this.lastUpdateTimestamp;
		this.checkCollisions();
		this.updateObjects()
		this.drawObjects()
		this.saveGameState();
		this.transmitGameState();
		this.lastUpdateTimestamp = now
	},
	
	updateObjects: function() {
		// Server function
		this.ball.update()
		for (var i=0;i<this.players.length; i++) {
			this.players[i].update();
		}
	},
	
	draw: function () {
		// Local function that draws on the client
	},
	
	start: function () {
		console.log("starting game with ____ as host")
		this.lastUpdateTimestamp = Date.now()
		var self = this
		(function gameLoop() {
				self.loop();
				requestAnimationFrame(gameLoop, self.ctx.canvas
		})();
	},
	
	saveGameState: function() {
		// only host should run this function
	}
	
});
