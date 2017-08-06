(function() {
    'use strict';

    chrome.runtime.onMessage.addListener(function (msg, sender, response) {
        var action = msg.subject.slice(3); // only need what's after 'js-'
        console.log(action);
    });

    var History = function() {
        this.actions = [];
        this.buildSelectorAncestry = function(target) {
            var parents = [];
            var element;
            var entry;
            for (element = target; element; element = element.parentNode) {
                entry = element.tagName.toLowerCase();
                if (entry === "html") { break; }
                if (element.className) { entry += "." + element.className.replace(/ /g, '.'); }
                if (element.id) { entry += '#' + element.id; }
                parents.push(entry);
            }
            parents.reverse();
            return parents.join(" ");
        };
        this.addClickAction = function(target) {
            this.actions.push({
                action: "click",
                selector: this.buildSelectorAncestry(target)
            });
        };
        this.clearHistory = function() {
            this.actions.length = 0;
        };
    };

    var history = new History();

    $('body').on('click', function(evt) {
        history.addClickAction(evt.target);
    });
})();