/**
 *  The Player, well the paddle :) TOOO: Implement extends from gameObject
 */
hangout.pong.Player = function( playerData,  gameState, playerController ) {
	this.playerData = playerData; // don't know what this looks like right now.. some data about who this is...
	this.posOnSide = 0.5;    // [0..1] 0 = on the origin,  1 =  origin + side
	this.rot = 0; // orientation on the canvas
	this.pos = { x:0, y:0 }; // position on the canvas
	this.gameState= gameState;
	this.playerController = playerController; // tells the player if s/he's going left or right on this tick
	this.playerController.setPlayer(this);
  // These are to increase the speed of drawing
  // Offscreen canvases for caching
  this.picCanvas;
  this.paddleCanvas;

};

hangout.pong.Player.prototype.init = function(index) {
	this.sideIndex = index;
	this.origin = this.getVertexPosition(this.sideIndex,this.gameState.getNumberOfSides(),this.gameState.canvas.width,this.gameState.canvas.height);
	var nextOrdinalPosition = this.getVertexPosition(this.sideIndex + 1, this.gameState.getNumberOfSides(),this.gameState.canvas.width,this.gameState.canvas.height);	

	this.rot = Math.PI*2/this.gameState.getNumberOfSides()*this.sideIndex + Math.PI/2;  // this orientation of the side on the canvas
	
	// this represents the player's side along which the player can travel in position on the 
	this.side = { x:nextOrdinalPosition.x - this.origin.x, 
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
	
	// Update the position based on what the controller says.

	if ( this.playerController.goLeft ){
		this.posOnSide += 0.005
	} else if ( this.playerController.goRight ){
		this.posOnSide -= 0.005
	}
	
	if (this.posOnSide < 0 ) { 
		this.posOnSide = 0;
	} else if (this.posOnSide > 1){
		this.posOnSide =1;
	}
	
	
	// set the coordinates on the canvas
	this.pos.x = this.origin.x + this.side.x * this.posOnSide;
	this.pos.y = this.origin.y + this.side.y * this.posOnSide;	
};

/**
 * After the Update we can draw ourselves on the canvas
 */ 
hangout.pong.Player.prototype.draw = function(context) {
	context.save();	
	context.beginPath();
	context.moveTo(this.origin.x,this.origin.y);
	context.lineTo(this.origin.x + this.side.x, this.origin.y + this.side.y);
	context.stroke();
	context.closePath();
	

	context.translate(this.pos.x,this.pos.y);
	context.rotate(this.rot);

	context.fillStyle = "green";
  	context.fillRect(-2,-2,4,4);
	
	context.restore();
};

/**
*  This function returns the vertex for an n-gon centred in the indicated plane
* params
* 	@index - the vertex we need [0..numSides-1]
*	@numSide - the number of sides in this n-gon
*	@width - the width of the plane
*	@height - the height of the plane
*/
hangout.pong.Player.prototype.getVertexPosition = function(index, numSides, width, height) {
	if (index > numSides) {
		index = 0;
	} else if ( index < 0 ){
		index = numSides;
	}
	
	var radianInterval = (2*Math.PI/numSides)*index;
	var xMid = width/2;  //{xMid,yMid} is the center point of the plane
	var yMid = height/2;
	var xScale = 0.75; 
	var yScale = 0.75;
	// In each dimension recenter the unit circle at the middle of plane(widthxheight)  and scale it
	// recall the unit circle 1 = sin(th)^2 + cos(th)^s and each point on the circle is  {cos(th), sin(th)}
	// details: http://en.wikipedia.org/wiki/Unit_circle (if you like)
	// We place the circle in the midde of the plane and the scale to fit in the plane itself
	
	return {x:Math.cos(radianInterval) * xMid * xScale + xMid , y:Math.sin(radianInterval) * yMid * yScale + yMid }
	
};

