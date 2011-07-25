/**
 * Main Game controller that controlls a single game instance.
 *
 * @constructor
 */
GameController = function() {
  this.engine = null;
};

/**
 * Initilaization routine for first load.
 */
GameController.prototype.init = function() {
  window.addEventListener('load', this.onWindowLoad.bind(this), false);
};

/**
 * Event when windows has completely loaded.
 */
GameController.prototype.onWindowLoad = function() {
  chrome.extension.onRequest.addListener(this.onExtensionRequest.bind(this));
  $('btnStart').addEventListener('click', this.onGameStart.bind(this), false);
};

/**
 * Starts the game selected. For now, it is just the pong game.
 */
GameController.prototype.onGameStart = function() {
  this.engine = new hangout.pong.Engine();
  this.engine.start();
};

/**
 * Google Plus has an HTML5 push API. This somehow doesn't play well with 
 * DOMSubtreeModified so something like this will fix issues where the posts
 * do not get updated when we visit another tab.
 *
 * @param {Object} request The request sent by the calling script.
 * @param {Object<MessageSender>} sender The location where the script has spawned.
 * @param {Function} request Function to call when you have a response. The 
                              argument should be any JSON-ifiable object, or
                              undefined if there is no response.
 */
GameController.prototype.onExtensionRequest = function(request, sender, sendResponse) {
  if (request.method == 'somecommand') {
       // Handle game moves here
  }
  sendResponse({});
};

// Main Content Script injection
var controller = new GameController();
controller.init();