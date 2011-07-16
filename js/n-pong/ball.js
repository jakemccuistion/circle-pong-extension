/**
 *  The Ball
 */
hangout.pong.Ball = function(){
  this.init(null);
};

hangout.pong.Ball.prototype.init = function(gameState) {
	this.gameState = gameState;
	this.vel = {x:0, y:0};
	this.rot = 0; // orientation on the canvas
	this.posX = 0; // position on the canvas
	this.posY = 0;
  this.radius = 10;
};

/**
 * Update the postion of this object. called by the game state manager ...
 *
 * @param{number} dt the time elapsed since the last update call. 
*/
hangout.pong.Ball.prototype.update = function(dt) {
	// Update the position. 
	this.posX = this.posX + (this.vel.x * dt);
  this.posY = this.posY + (this.vel.y * dt);
};

/**
 * After the Update we can draw owrselves on the 
 */ 
hangout.pong.Ball.prototype.draw = function(context) {
	/* translate the internal state to a position on the canvas and */
  context.save();
	context.beginPath();
  context.fillStyle = 'red';
  context.arc(this.posX, this.posY, this.radius, 0, Math.PI*2, false);
  context.closePath()
  context.fill();
  context.restore();
};

