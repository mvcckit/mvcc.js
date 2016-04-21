/* 
   #mv-include
   ========================================================================== */

/**
 * Includes an HTML fragment from another page.
 */

mvcc.com.create({
	selector: '[mv-include]',
	init: function(el) {
		var url = el.getAttribute('mv-include');
		mvcc.http.get(url).then(function(data) {
			el.innerHTML = data;
		});
	},
	done: function(el) {
		el.removeAttribute('mv-cloak');
	}
}, 'mv-include');