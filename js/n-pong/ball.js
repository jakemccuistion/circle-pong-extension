/**
 *  The Ball
 */
Ball = function(){

};

Ball.prototype.init = function(gameState){
	this.gameState= gameState;
	this.vel = {x:0, y:0};
	this.rot = 0; // orientation on the canvas
	this.posX =0; // position on the canvas
	this.posY =0;

	
};


/*
 - Update the postion of this object. called by the game state manager...
 - dt is the time elapsed since the last update call. 
*/
Ball.prototype.update = function(dt) {

	//Update the position. 
	
	// set the coordinates on the canvas

};

/* After the Update we can draw owrselves on the */ 
Ball.prototype.draw = function(canvas, element) {
	/* translate the internal state to a position on the canvas and */
	
};

