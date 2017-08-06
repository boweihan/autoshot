(function() {
    'use strict';

    var buildSelectorAncestry = function(target) {
        var parents = [];
        var element;
        var entry;

        for (element = target; element; element = element.parentNode) {
            entry = element.tagName.toLowerCase();
            if (entry === "html") {
                break;
            }
            if (element.className) {
                entry += "." + element.className.replace(/ /g, '.');
            }
            if (element.id) {
                entry += '#' + element.id;
            }
            parents.push(entry);
        }

        parents.reverse();
        return parents.join(" ");
    };

    $('body').on('click', function(evt) {
        console.log(buildSelectorAncestry(evt.target));
    });
})();