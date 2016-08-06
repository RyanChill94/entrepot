var chill = {};
chill.bindevent = {};
chill.AJAX = {};
chill.animation = {

    //transform¼æÈÝ
    transform: function (element, value, key) {
        key = key || "Transform";
        ["Moz", "O", "Ms", "Webkit", ""].forEach(function (prefix) {
            element.style[prefix + key] = value;
        });
        return element;
    }
};

chill.tool = {
    // ä¯ÀÀÆ÷Ñ¡ÔñÆ÷API
    $: function (selector) {
        return document.querySelector(selector);
    },

    $$: function (selector) {
        return document.querySelectorAll(selector);
    }
};
