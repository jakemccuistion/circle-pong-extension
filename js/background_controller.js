/**
 * Manages a single instance of the entire application.
 * @constructor
 */
BackgroundController = function() {
  this.participants = {};
  this.hangout_part_join_pattern = /^(.*) (joined|left) group chat\.$/;
  this.onExtensionLoaded();
};

/**
 * Triggered when the extension just loaded. Should be the first thing
 * that happens when chrome loads the extension.
 */
BackgroundController.prototype.onExtensionLoaded = function() {
  var currVersion = chrome.app.getDetails().version;
  var prevVersion = settings.version;
  if (currVersion != prevVersion) {
    // Check if we just installed this extension.
    if (typeof prevVersion == 'undefined') {
      this.onInstall();
    } else {
      this.onUpdate(prevVersion, currVersion);
    }
    settings.version = currVersion;
  }
};

/**
 * Triggered when the extension just installed.
 */
BackgroundController.prototype.onInstall = function() {
  // Inject the content script to all opened window.
  chrome.windows.getAll({ populate: true }, function(windows) {
    for (var w = 0; w < windows.length; w++) {
      var tabs = windows[w].tabs;
      for (var t = 0; t < tabs.length; t++) {
        var tab = tabs[t];
        var url = tab.url;
        if (url.indexOf('https://talkgadget.google.com/talkgadget') == 0) { 
          chrome.tabs.executeScript(tab.id, { file: '/js/injection/talk_injection.js' });
        }
        else if (url.indexOf('https://talkgadget.google.com/hangouts') == 0) { 
          chrome.tabs.executeScript(tab.id, { file: '/js/injection/hangout_injection.js' });
        }
        else if (url.indexOf('https://googlesharedspaces.appspot.com/p/tuna') == 0) { 
          chrome.tabs.executeScript(tab.id, { file: '/js/injection/user_injection.js' });
        }
      }
    }
  });
};

/**
 * Triggered when the extension just uploaded to a new version. DB Migrations
 * notifications, etc should go here.
 *
 * @param {string} previous The previous version.
 * @param {string} current  The new version updating to.
 */
BackgroundController.prototype.onUpdate = function(previous, current) {
};

/**
 * Initialize the main Background Controller
 */
BackgroundController.prototype.init = function() {
  chrome.browserAction.onClicked.addListener(this.onBrowserActionClicked.bind(this));
  chrome.extension.onRequest.addListener(this.onExtensionRequest.bind(this));
};

/**
 * Listen for extension requests.
 *
 * @param {Object} request The request sent by the calling script.
 * @param {Object<MessageSender>} sender The location where the script has spawned.
 * @param {Function} request Function to call when you have a response. The 
                              argument should be any JSON-ifiable object, or
                              undefined if there is no response.
 */
BackgroundController.prototype.onExtensionRequest = function(request, sender, sendResponse) {
  if (request.method == 'ParticipantsReceived') {
    this.onParticipantsReceived(request.data);
  }
  else if (request.method == 'ChatReceived') {
    this.onChatReceived(request.data);
  }
  sendResponse({}); // snub
};

/**
 * Event when a chat message has been received.
 *
 * @param {Object} data The chat response object.
 */
BackgroundController.prototype.onChatReceived = function(data) {
  console.log('ChatReceived', data);
  if (data.from == 'g') { // Google Event
    var matchJoinPart = data.line.matches(this.hangout_part_join_pattern);
    if (matchJoinPart) {
      var name = matchJoinPart[1];
      var state = matchJoinPart[2];
      if (state == 'joined') {
        this.onJoin(name);
      }
      else { // left
        this.onPart(name);
      }
    }
  }
};

/**
 * Event when a user has joined the hangout.
 *
 * @param {string} name the player name.
 */
BackgroundController.prototype.onJoin = function(name) {
  console.log('ParticipantsJoined', name);
};

/**
 * Event when a user has parted the hangout.
 *
 * @param {string} name the player name.
 */
BackgroundController.prototype.onPart = function(name) {
  console.log('ParticipantsParted', name);
};

/**
 * Event when a participant been received.
 *
 * @param {Object} data The chat response object.
 */
BackgroundController.prototype.onParticipantsReceived = function(data) {
  this.participants = data;
};

/**
 * Listens when the browser action has been clicked. Opens up a new window to run the canvas.
 *
 * @param {Object} tab The current tab that the browser action is referring to.
 */
BackgroundController.prototype.onBrowserActionClicked = function(tab) {
  chrome.windows.create({url: chrome.extension.getURL('game.html'), width: 500, height: 500, type: 'popup' });
};