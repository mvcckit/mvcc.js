/* 
   #mv-template
   ========================================================================== */

/**
 * Replaces handlebars with values from an object.
 */

mvcc.com.create({
	selector: '[mv-template]',
	data: {},
	init: function(el) {
		data = window[el.getAttribute('mv-template')];
	},
	draw: function(el) {
		return mvcc.template(el.innerHTML, data);
	},
	done: function(el) {
		el.removeAttribute('mv-cloak');
	}
}, 'mv-template');