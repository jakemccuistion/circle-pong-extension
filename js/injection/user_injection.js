/**
 * User Injection to figure out how many users exist here,
 */
hangout.injection.UserInjection = function() {
  this.exportEvent = document.createEvent('Event');
  this.exportEvent.initEvent('particpantExported', true, true);
  this.transferDOM = this.createTransferDOM();
};

/**
 * Constructs the transfer DOM that will be used to send data from content script
 * and dom world.
 */
hangout.injection.UserInjection.prototype.createTransferDOM = function() {
  var transferDOM = document.createElement('div');
  transferDOM.setAttribute('id', 'transfer-dom-area');
  transferDOM.style.display = 'none';
  return transferDOM;
};


/**
 * Initilaization routine for first load.
 */
hangout.injection.UserInjection.prototype.init = function() {
  document.body.appendChild(this.transferDOM);
  window.addEventListener('particpantExported', this.particpantExported.bind(this));
  chrome.extension.onRequest.addListener(this.onExtensionRequest.bind(this));
  this.injectParticipantsExtraction();
};

/**
 * When the participant is exported this will be called.
 */
hangout.injection.UserInjection.prototype.particpantExported = function() {
  var transferDOM = $('transfer-dom-area');
  var participantsMap = JSON.parse(transferDOM.innerText);
  chrome.extension.sendRequest({method: 'ParticipantsReceived', data: participantsMap});
};


/**
 * Try to read the DOM's world JS variables
 */
hangout.injection.UserInjection.prototype.injectParticipantsExtraction = function() {
  var postParticipantsMap = function() {
    // Use events to notify the content script. Replicate the event the content
    // script has, so we can pass this event to that world.
    var exportParticipantEvent = document.createEvent('Event');
    exportParticipantEvent.initEvent('particpantExported', true, true);
    
    // Create a transfer node DOM, since that is the only way two worlds can
    // communicate with each other.
    var transferDOM = document.getElementById('transfer-dom-area');

    // Listen on new updated participants. Inform our content script that we 
    // have received the object from Google.
    // TODO(mohamed): there should be a way to override gadgetManager.updateParticipants
    //                but somehow the following override doesn't work
    //
    //                var oldUpdateParticipants = gadgetManager.updateParticipants;
    //                gadgetManager.updateParticipants = function(participants) {
    //                  transferDOM.innerText = JSON.stringify(participants);
    //                  window.dispatchEvent(exportParticipantEvent);
    //                  oldUpdateParticipants();
    //                };
    //
    var participantFinder = function() {
      transferDOM.innerText = JSON.stringify(gadgetManager.participants);
      window.dispatchEvent(exportParticipantEvent);
      setTimeout(participantFinder, 5000);
    };
    participantFinder();
  };
  
  // Start injecting the JS script.
  var script = document.createElement('script');
  script.setAttribute('id', 'inject-area');
  script.appendChild(document.createTextNode('(' + postParticipantsMap + ')();'));
  document.body.appendChild(script);  
};

/**
 * Listen for some requests coming from the extension.
 *
 * @param {Object} request The request sent by the calling script.
 * @param {Object<MessageSender>} sender The location where the script has spawned.
 * @param {Function} request Function to call when you have a response. The 
                              argument should be any JSON-ifiable object, or
                              undefined if there is no response.
 */
hangout.injection.UserInjection.prototype.onExtensionRequest = function(request, sender, sendResponse) {
  if (request.method == 'GetUserList') {
  }
  sendResponse({});
};

// Main Content Script injection
var injection = new hangout.injection.UserInjection();
injection.init();