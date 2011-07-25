hangout.injection.HangoutInjection = function() {
};

hangout.injection.HangoutInjection.prototype.init = function() {
  // chrome.extension.sendRequest({method: 'HangoutStarted'});
};

var injection = new hangout.injection.HangoutInjection();
injection.init();