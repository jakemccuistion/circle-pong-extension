/**
 * The A Player Controller with ramdom intentions.
 */
hangout.pong.PlayerControllerRandom = function(gameState, player) {
	hangout.pong.PlayerController.call(this, gameState, player);

	this.MAX_TIMEOUT = 1000; // maximum time allowance for travelling in a chosen direction
	this.timeout = -1;   // time to travel in the chosen direction
};
hangout.inherits(hangout.pong.PlayerControllerRandom, hangout.pong.PlayerController);

/**
 * 
 * @param {number} dt The distance.
 */
hangout.pong.PlayerControllerRandom.prototype.update = function(dt) {
	if (this.timeout < 0) {
		this.timeout = Math.random() * this.MAX_TIMEOUT;
		var dice = Math.random();
		if (dice < .33) {
			this.goLeft = true;
			this.goRight = false;
		}
    else if (dice < .66 ) {
			this.goRight = true;
			this.goLeft = false;
		}
	}
  else {
		this.timeout -= dt;
	}
};
