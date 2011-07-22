/**
 *  The Player User Controller TODO
 */
hangout.pong.PlayerControllerUser = function(gameState,player) {
	

	hangout.pong.PlayerController.superClass_.contructor(gameState,player);
	
};

hangout.inherits(hangout.pong.PlayerControllerUser, hangout.pong.PlayerController);

/**
 *
 */
hangout.pong.PlayerControllerUser.prototype.init = function() {

};


/**
 * - onMoveEvent - listens for user instructions to move
*/
hangout.pong.PlayerControllerUser.prototype.onMoveEvent = function() {
	/* buffer move event */

};


/**
 * - 
*/
hangout.pong.PlayerControllerUser.prototype.update = function(dt) {
	/* take the buffered event left right */
	/* set goLeft or goRight */
};



