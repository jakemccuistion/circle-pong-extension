// // shim layer with setTimeout fallback
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
		this.running = null;
		this.status = document.getElementById('status')
		this.context = document.getElementById('gameboard').getContext("2d")
		
		this.addPlayer('john');
		this.addPlayer('james');
		this.addPlayer('mohamed');
}

Engine.prototype.drawBackground = function() {

}

Engine.prototype.addPlayer = function(player) {
	var controller = new PlayerUserController(); // Default to user controller.
	controller.init( this );
	var newPlayer = new Player(player, this, controller);
	// 
	this.players.push(newPlayer);
	for ( var i = 0; i < this.players.length; i++){
		this.players[i].init(i);		
	}	
}

Engine.prototype.removePlayer = function(player) {
	
}


// feel free to rename this...
Engine.prototype.getNumberOfSides = function() {
	return this.players.length;
}

Engine.prototype.getOrdinalPosition = function(index) {
	var n = this.getNumberOfSides(); 
	if ( index > n ){
		index = 0;
	} 
	
	var radianInterval = ( 2*Math.PI/n ) * index;
	var xMid = 200 / 2;  // TODO: Update with actual dimensions!
	var yMid = 200 /2 ;
	var xScale = 0.75;
	var yScale = 0.75;
	// In each dimension recenter the unit circle at the middle of canvas and scale it u
	return {x:Math.cos(radianInterval) * xMid * xScale + xMid , y:Math.sin(radianInterval) * yMid * yScale + yMid }
	
}

Engine.prototype.checkCollisions = function(deltaTime) {


}

Engine.prototype.loop = function() {
	if (this.running) {
		var now = Date.now();
		this.deltaTime = now - this.lastUpdateTimestamp;
		this.checkCollisions(this.deltaTime);
		this.updateObjects(this.deltaTime);
		this.saveGameState();
		this.transmitGameState();
		this.draw();
		this.lastUpdateTimestamp = now;
	}
};

Engine.prototype.transmitGameState = function() {
	
};

Engine.prototype.updateObjects = function(dt) {
	// Server function
	this.ball.update(dt);
	for (var i=0;i<this.players.length; i++) {
		this.players[i].update(dt);
	}
};

Engine.prototype.draw = function () {
	// Local function that draws on the client
    var ctx = this.context;
	//ctx.canvas.width = "380px"; // clears the canvas
	document.getElementById('gameboard').width = document.getElementById('gameboard').width;
	ctx.fillStyle = 'black';
	this.drawBackground();
    this.ball.draw(ctx);
};




/*
 - Starts the game loop from running 
*/
Engine.prototype.start = function () {
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
Engine.prototype.pause = function () {
	this.running = false;
};

Engine.prototype.saveGameState = function() {
	// only host should run this function
};
