/**
 *  The Player
 */
Player = function(){

};

Player.prototype.init = function(playerData, gameState, playerController){
	this.playerData = playerData // don't know what this looks like right now.. some data about who this is...
	
	this.posOnSegment = 0.5;    // 0 to 1 0 = left hds 1, = rhs. The extend along the side of the n-gon
	this.rot = 0; // orientation on the canvas
	this.posX =0; // position on the canvas
	this.posY
	this.gameState= gameState;
	this.playerController; // tells the player if s/he's going left or right on this tick
};


/*
 - Update the postion of this object. called by the game state manager...
 - dt is the time elapsed since the last update call. 
*/
Player.prototype.update = function(dt) {
	this.playerController.update(dt);
	
	//Update the position. based on what the controll says.
	
	// set the coordinates on the canvas

};

/* After the Update we can draw owrselves on the */ 
Player.prototype.draw = function(canvas, element) {
	/* translate the internal state to a position on the canvas and 
	
};

