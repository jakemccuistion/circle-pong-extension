/**
 *
 */
TalkInjection = function()
{
};

/**
 * Initilaization routine for first load.
 */
TalkInjection.prototype.init = function()
{
  chrome.extension.onRequest.addListener(this.onExtensionRequest.bind(this));
  var history = document.getElementById('history');
  history.addEventListener('DOMSubtreeModified', this.onHistoryReceieved.bind(this), false);

};

/**
 * History on the Chat console received.
 */
TalkInjection.prototype.onHistoryReceieved = function(e)
{
  var message = e.target.querySelector('.wackmsg_new_sender');
  if (message) {
    chrome.extension.sendRequest({method: 'ChatRecieved', data: message.innerText});
    alert('zombie' + message.innerText);
  }
  else {
    alert('insane');
  }
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
TalkInjection.prototype.onExtensionRequest = function(request, sender, sendResponse) {
  if (request.method == 'somecommand') {
  
  }
  sendResponse({});
};

// Main Content Script injection
var injection = new Injection();
injection.init();
