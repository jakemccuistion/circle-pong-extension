/**
 *  The Player, well the paddle :)
 */
hangout.pong.Player = function( playerData,  gameState, playerController ) {
	this.playerData = playerData; // don't know what this looks like right now.. some data about who this is...
	this.posOnSegment = 0.5;    // 0 to 1 0 = left hds 1, = rhs. The extend along the side of the n-gon
	this.rot = 0; // orientation on the canvas
	this.pos = { x:0, y:0 }; // position on the canvas
	this.gameState= gameState;
	this.playerController = playerController; // tells the player if s/he's going left or right on this tick
  // These are to increase the speed of drawing
  // Offscreen canvases for caching
  this.picCanvas;
  this.paddleCanvas;

};

hangout.pong.Player.prototype.init = function(index) {
	this.sideIndex = index;
	this.origin = this.getOrdinalPosition(this.sideIndex,this.gameState.getNumberOfSides(),this.gameState.canvas.width,this.gameState.canvas.height);
	var nextOrdinalPosition = this.getOrdinalPosition (this.sideIndex + 1, this.gameState.getNumberOfSides(),this.gameState.canvas.width,this.gameState.canvas.height);	
	this.rot = Math.PI*2/this.gameState.getNumberOfSides()*this.sideIndex + Math.PI/2;
	
	// this represents the players line along which the player can travel in position on the 
	this.segment = { x:nextOrdinalPosition.x - this.origin.x, 
      				 y:nextOrdinalPosition.y - this.origin.y }; 

};


hangout.pong.Player.prototype.initDraw = function (imageSrc) {
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
hangout.pong.Player.prototype.update = function(dt) {
	this.playerController.update(dt);
	
	// Update the position based on what the controll says.
	
	// set the coordinates on the canvas
	this.pos.x = this.origin.x + this.segment.x * this.posOnSegment;
	this.pos.y = this.origin.y + this.segment.y * this.posOnSegment;	
};

/**
 * After the Update we can draw owrselves on the
 */ 
hangout.pong.Player.prototype.draw = function(context) {
	context.save();
	context.translate(this.pos.x,this.pos.y)
	context.rotate(this.rot);
	
	///PLACEHOLDER:  Just write the registered name along the corresponding side
	var segLength = Math.sqrt(this.segment.x*this.segment.x + this.segment.y*this.segment.y)
	context.fillText(this.playerData,-segLength/2,0);
	//END
	
	context.restore();
};

hangout.pong.Player.prototype.getOrdinalPosition = function(index, numSides, width, height) {
	if (index > numSides) {
		index = 0;
	} 
	
	var radianInterval = (2*Math.PI/numSides)*index;
	var xMid = width/2;  // TODO: Update with actual dimensions!
	var yMid = height/2;
	var xScale = 0.75;
	var yScale = 0.75;
	// In each dimension recenter the unit circle at the middle of canvas and scale it u
	return {x:Math.cos(radianInterval) * xMid * xScale + xMid , y:Math.sin(radianInterval) * yMid * yScale + yMid }
	
};

