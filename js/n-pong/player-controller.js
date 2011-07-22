
/**
 *  The Base clase for controler of a player in the game
 */

hangout.pong.PlayerController = function( gameState ){
	this.gameState = gameState;
	this.player = null;
	this.goLeft = false;
	this.goRight = false;
}

hangout.pong.PlayerController.prototype.setPlayer = function( player ){
	this.player = player;
}

hangout.pong.PlayerController.prototype.update = function(dt){

}


