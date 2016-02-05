/* ==========================================================================
   #COM 
   ========================================================================== */

mvcc.com = (function () {

/**
 * The components collection
 */

var _components = {};

/* 
   #compiler
   ========================================================================== */

/**
 * The `compiler` function returns the multiple selectors for a component.
 *
 * @name mvcc.com.compiler
 *
 * @param {string} name
 *
 *     The component name.
 *
 * @returns {string}
 *
 *     The selector string.
 */

var compiler = function(name) {	return '[data-' + name + '],[' + name + '],' + name; };

/* 
   #create
   ========================================================================== */

/**
 * The `create` function creates a new component in the components collection.
 *
 * @name mvcc.com.create
 *
 * @param {function} fn
 *
 *     The callback function.
 *
 * @param {string} name
 *
 *     The component name.
 */

var create = function(fn, name) { 
	_components[name] = mvcc.extend(fn, {
		_selector: compiler(name)
	}); 
};

/* 
   #remove
   ========================================================================== */

/**
 * The `remove` function removes a component from the components collection.
 *
 * @name mvcc.com.remove
 *
 * @param {string} name
 *
 *     The component name. 
 */

var remove = function(name) { 
	if(mvcc.isDefined(_components[name])) {
		delete _components[name]; 
	}
};

/* 
   #clear
   ========================================================================== */

/**
 * The `clear` function removes all components from the components collection.
 *
 * @name mvcc.com.clear
 */

var clear = function() { _components = {}; };

/* 
   #render
   ========================================================================== */

/**
 * The render function renders a component to the page.
 *
 * @name mvcc.com.render
 *
 * @param {string} name
 *
 *     The component name.
 */

var render = function(name) { 
		
	var component = _components[name], els = document.querySelectorAll(component._selector);

	/**
	 * Iterate through the matches.
	 */

	for(var index = 0, length = els.length; index < length; index++) {

		var el = mvcc.query(els[index]);

		/**
		 * The init property is called before the component is rendered. 
		 *
		 * @name component.init
		 */

		if (mvcc.isFunction(component.init)) { 
			component.init(el); 
		}

		/**
		 * The draw property is called when the component is rendered. 
		 *
		 * @name component.draw
		 *
		 * @property {function} component.draw
		 *
		 * @returns {string}
		 *
		 *     Returns a string containing the HTML. 
		 */

		if (mvcc.isFunction(component.draw)) { 
			el.html(mvcc.template(component.draw(el), component)); 
		}

		/**
		 * The done property is called after the component is rendered. 
		 *
		 * @name component.done
		 *
		 * @property {function} component.done
		 */

		if (mvcc.isFunction(component.done)) { 
			component.done(el); 
		}

	}
};

/* 
   #renderAll
   ========================================================================== */

/**
 * The renderAll function renders all components to the page.
 *
 * @name mvcc.com.renderAll
 */

var renderAll = function() {	
	for(var name in _components) {
		render(name);
	}
};

/* 
   exports
   ========================================================================== */

return {
	create: create,
	remove: remove,
	render: render,
	renderAll: renderAll,
	item: _components
};

})();