/**
 * User Injection to figure out how many users exist here,
 */
UserInjection = function()
{
  this.exportEvent = document.createEvent('Event');
  this.exportEvent.initEvent('particpantExported', true, true);
  this.transferDOM = this.createTransferDOM();
};

/**
 * Constructs the transfer DOM that will be used to send data from content script
 * and dom world.
 */
UserInjection.prototype.createTransferDOM = function()
{
  var transferDOM = document.createElement('div');
  transferDOM.setAttribute('id', 'transfer-dom-area');
  transferDOM.style.display = 'none';
  return transferDOM;
};


/**
 * Initilaization routine for first load.
 */
UserInjection.prototype.init = function()
{
  document.body.appendChild(this.transferDOM);
  window.addEventListener('particpantExported', this.particpantExported.bind(this));
  chrome.extension.onRequest.addListener(this.onExtensionRequest.bind(this));
};

/**
 * When the participant is exported this will be called.
 */
UserInjection.prototype.particpantExported = function()
{
  var transferDOM = document.getElementById('transfer-dom-area');
  var participantsMap = JSON.parse(transferDOM.text());
  chrome.extension.sendRequest({method: 'ParticipantsReceived', data: participantsMap});
};


/**
 * Try to read the DOM's world JS variables
 */
UserInjection.prototype.fetchParticipantsList = function()
{
  var postParticipantsMap = function() {
    // Use events to notify the content script. Replicate the event the content
    // script has, so we can pass this event to that world.
    var exportParticipantEvent = document.createEvent('Event');
    exportParticipantEvent.initEvent('particpantExported', true, true);
    
    // Create a transfer node DOM, since that is the only way two worlds can
    // communicate with each other.
    var transferDOM = document.getElementById('transfer-dom-area');
    transferDOM.innerText = JSON.stringify(gadgetManager.participants);
    
    // Inform our content script that we have received the object from Google.
    window.dispatchEvent(exportParticipantEvent);
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
UserInjection.prototype.onExtensionRequest = function(request, sender, sendResponse) {
  if (request.method == 'GetUserList') {
    this.fetchParticipantsList();
  }
  sendResponse({});
};

// Main Content Script injection
var injection = new UserInjection();
injection.init();
injection.fetchParticipantsList();