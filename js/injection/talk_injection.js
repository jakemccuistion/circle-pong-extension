/**
 * Google Talk injection
 */
hangout.injection.TalkInjection = function() {
  this.chatPattern = /<b>(.*)<\/b>(.*)/i;
  this.lastAuthor = null;
};

/**
 * Initilaization routine for first load.
 */
hangout.injection.TalkInjection.prototype.init = function() {
  setTimeout(this.lazyLoadChatList.bind(this), 10000);
};

/**
 * Lazyload the chat list since it gets loaded after the page loads. It is
 * quite freaky since the iframes gets loaded asynchronously. Perhaps we
 * should do a join on all iframe loads to make it better.
 */
hangout.injection.TalkInjection.prototype.lazyLoadChatList = function() {
  var history = $('history');
  if (history) {
    chrome.extension.onRequest.addListener(this.onExtensionRequest.bind(this));
    history.addEventListener('DOMNodeInserted', this.onHistoryReceieved.bind(this), false);
  }
};

/**
 * History on the Chat console received.
 */
hangout.injection.TalkInjection.prototype.onHistoryReceieved = function(e) {
  var chatDOM = e.target;
  if (chatDOM) {
    var message = chatDOM.querySelector('.wackmsg_new_sender') || chatDOM.querySelector('.wackmsg_same_sender');
    if (message) {
      var isNewSender = message.classList.contains('wackmsg_new_sender');
      // Walk up the DOM to find out the main DOM that has the from type.
      var parent = message.parentNode;
      while (!parent.classList.contains('wackmsg')) {
        parent = parent.parentNode;
      }
      var fromMessage = parent.getAttribute('from');
      if (parent != 'sa') { // Filter out Sent at messages.
        var chatMessage = this.parseChatMessage(isNewSender, fromMessage, message.innerHTML);
        chrome.extension.sendRequest({method: 'ChatReceived', data: chatMessage});
      }
    }
  }
};

/**
 * Prepare the message by extracting the attributes from each person.
 * 
 * @param {boolean} isNewSender If the chat message is new.
 * @param {string} from The recipient. It could be 'g' for Google or numbers for
 *                      everything else.
 * @param {string} message The message coming from Hangout chat.
 * @return {Object} the response object that contains from, author, and line.
 */
hangout.injection.TalkInjection.prototype.parseChatMessage = function(isNewSender, from, message) {
  var matches = message.match(this.chatPattern);
  var author = matches ? matches[1] : null;
  var line = matches ? matches[2] : message;
  if (from != 'g') {
    if (isNewSender) {
      this.lastAuthor = author;
    } else {
      author =  this.lastAuthor;
    }
  }
  return {
    'from': from,
    'author': author,
    'line': line
  };
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
hangout.injection.TalkInjection.prototype.onExtensionRequest = function(request, sender, sendResponse) {
  if (request.method == 'somecommand') {
  
  }
  sendResponse({});
};

// Main Content Script injection
var injection = new hangout.injection.TalkInjection();
injection.init();
