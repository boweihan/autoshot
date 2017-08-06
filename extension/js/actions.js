(function() {
    'use strict';

    var bg = chrome.extension.getBackgroundPage();

    var buttons = {
        '#js-record' : "record",
        '#js-stop' : "stop",
        '#js-accept' : "accept",
        '#js-reject' : "reject"
    };

    var initButtons = function(buttons) {
        var values = Object.values(buttons);
        var keys = Object.keys(buttons);
        for (var i = 0; i < keys.length; i++) {
            $(keys[i]).on('click', logButton);
        }
    };

    var responseCallback = function(info) {
        // optional callback on response
    };

    // TODO: this is sending two messages at the moment
    var logButton = function(elem) {
        bg.console.log(elem);
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function (tabs) {
            chrome.tabs.sendMessage(
                tabs[0].id,
                { from: 'popup', subject: elem.currentTarget.id },
                responseCallback);
        });
    };

    initButtons(buttons);
})();