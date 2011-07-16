/**
 *  The Player
 */
Player = function( playerData,  gameState, playerController ){
	this.playerData = playerData; // don't know what this looks like right now.. some data about who this is...
	this.posOnSegment = 0.5;    // 0 to 1 0 = left hds 1, = rhs. The extend along the side of the n-gon
	this.rot = 0; // orientation on the canvas
	this.pos.x =0; // position on the canvas
	this.pos.y = 0; 
	this.gameState= gameState;
	this.playerController; // tells the player if s/he's going left or right on this tick
    // These are to increase the speed of drawing
    // Offscreen canvases for caching
    this.picCanvas;
    this.paddleCanvas;

};

Player.prototype.init = function(index){
	this.sideIndex = index;
	this.origin = this.gameState.getOrdinalPosition(this.sideIndex);
	var nextOrdinalPostion = this.gameState.getOrdinalPosition (this.sideIndex + 1);	
	
	
	// this represents the players line along which the player can travel in position on the 
	this.segment = { x:nextOrdninalPosition.x - this.origin.x, 
				     y:nextOrdninalPosition.y - this.origin.y }; 

};


Player.prototype.initDraw = function (imageSrc) {
    this.picCanvas = document.createElement("canvas");
    var ctx = this.picCanvas.getContext("2d");
    var pic = new Image();
    pic.src = imageSrc;
    pic.onload = function() {
        ctx.drawImage(pic, 0, 0);
    }
    
    this.paddleCanvas = document.createElement("canvas");
    var p_ctx = this.paddleCanvas.getContext("2d");
    // draw paddle here
    // consider promoting this to the engine since we
    // only need one paddle canvas for everyone
    // and can redraw
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
Player.prototype.draw = function(context) {
	/* translate the internal state to a position on the canvas and  */
	//  look up the ordinal position.
    context.save();
    
    context.restore();
};

