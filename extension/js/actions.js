(function() {
    'use strict';

    var bg = chrome.extension.getBackgroundPage();

    var buttons = {
        record: '#js-record',
        stop: '#js-stop',
        accept: '#js-accept',
        reject: '#js-reject'
    };

    var initButtons = function(buttons) {
        var values = Object.values(buttons);
        var keys = Object.keys(buttons);
        for (var i = 0; i < values.length; i++) {
            $(values[i]).on('click', logButton);
        }
    };

    var logButton = function(elem) {
        bg.console.log(elem);
    };

    initButtons(buttons);
})();