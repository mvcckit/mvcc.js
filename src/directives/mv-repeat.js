/* 
   #mv-repeat
   ========================================================================== */

/**
 * Repeats an item
 */

mvcc.com.create({
	selector: '[mv-repeat]',
	init: function(el) {
		var that = this;
		mvcc.http.get(el.getAttribute('mv-repeat')).then(function (data) {
            that.load(el, JSON.parse(data));
        });
	},
	load: function(el, data) {
        var target = '';
        var source = el.innerHTML;
        for (var prop in data) {
            target += mvcc.template(source, data[prop]);
        }
        el.innerHTML = target;
	},
	done: function(el) {
		el.removeAttribute('mv-cloak');
	}
}, 'mv-repeat');