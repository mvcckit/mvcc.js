/* 
   #mv-repeat
   ========================================================================== */

/**
 * The `mvcc-repeat` directive instantiates a template once per item from a collection.
 *
 * @name mv-repeat
 * @type attribute
 * @attr {string}
 *
 *     The json file.
 */

mvcc.com.create({
    init: function (el) {
        var that = this;
        mvcc.http.get(el.attr('mv-repeat')).then(function (data) {
            that.load(el, JSON.parse(data));
        });
    },
    load: function (el, data) {
        var target = '', template = el.html();
        for (var prop in data) {
            target += mvcc.template(template, data[prop]);
        }
        el.innerHTML = target;
        el.removeAttr('mv-cloak');
    }
}, 'mv-repeat');
