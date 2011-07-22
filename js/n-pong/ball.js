/**
 *  The Ball
 */
hangout.pong.Ball = function(gameState){
	this.gameState = gameState;
	this.init();
};

hangout.pong.Ball.prototype.init = function() {
	this.vel = {x:0.05, y:0.05}; ///.. just set it moving in TODO!
	this.rot = 0; // orientation on the canvas
	this.pos = {x:this.gameState.canvas.width/2, y:this.gameState.canvas.height/2}; 
    this.radius = 10;
    this.shape = new hangout.pong.Shape.Circle(this.pos,this.radius); // This is the balls collision shape
};

/**
 * Update the postion of this object. called by the game state manager ...
 *
 * @param{number} dt the time elapsed since the last update call. 
*/
hangout.pong.Ball.prototype.update = function(dt) {
	// Update the position. 
	this.pos.x = this.pos.x + (this.vel.x * dt);
	this.pos.y = this.pos.y+ (this.vel.y * dt);
	this.vel.x = this.vel.x * 0.999; // Attenuate the ball a little
	this.vel.y = this.vel.y * 0.999; // 
	
};

/**
 * After the Update we can draw ourselves on the 
 */ 
hangout.pong.Ball.prototype.draw = function(context) {
	/* translate the internal state to a position on the canvas and */
  context.save();
	context.beginPath();
  context.fillStyle = 'red';
  context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI*2, false);
  context.closePath()
  context.fill();
  context.restore();
};

