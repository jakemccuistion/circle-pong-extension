/**
 *  The Player
 */
Player = function(){

};

Player.prototype.init = function(playerData, gameState, playerController, index){
	this.playerData = playerData; // don't know what this looks like right now.. some data about who this is...
	this.sideIndex = index;
	this.posOnSegment = 0.5;    // 0 to 1 0 = left hds 1, = rhs. The extend along the side of the n-gon
	this.rot = 0; // orientation on the canvas
	this.pos.x =0; // position on the canvas
	this.pos.y = 0; 
	this.gameState= gameState;
	this.playerController; // tells the player if s/he's going left or right on this tick

	this.origin = this.gameState.getOrdinalPosition( this.sideIndex );
	
	var nextOrdinalPostion = this.gameState.getOrdinalPosition ( this.sideIndex + 1);	
	
	
	// this represents the players line along which the player can travel in position on the 
	this.segment = { x:nextOrdninalPosition.x - this.origin.x, 
				     y:nextOrdninalPosition.y - this.origin.y }; 

};


/*
 - Update the postion of this object. called by the game state manager...
 - dt is the time elapsed since the last update call. 
*/
Player.prototype.update = function(dt) {
	this.playerController.update(dt);
	
	//Update the position. based on what the controll says.
	
	// set the coordinates on the canvas
	
	this.pos.x = this.origin.x + segment.x * this.posOnSegment;
	this.pos.y = this.origin.y + segment.y * this.posOnSegment;	
};

/* After the Update we can draw owrselves on the */ 
Player.prototype.draw = function(canvas, element) {
	/* translate the internal state to a position on the canvas and  */
	//  look up the ordinal position.
	
	
};

