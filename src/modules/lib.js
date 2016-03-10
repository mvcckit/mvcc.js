/* ==========================================================================
   #COM 
   ========================================================================== */

mvcc.controller = (function () {

/**
 * The components collection
 */

var _controllers = {};

/* 
   #create
   ========================================================================== */

/**
 * The `create` function creates a new controller in the controllers collection.
 *
 * @name mvcc.com.create
 *
 * @param {function} fn
 *
 *     The callback function.
 *
 * @param {string} name
 *
 *     The controller name.
 */

var create = function(fn, name) { 
	_controllers[name] = fn;
};

/* 
   #remove
   ========================================================================== */

/**
 * The `remove` function removes a controller from the controllers collection.
 *
 * @name mvcc.com.remove
 *
 * @param {string} name
 *
 *     The controller name. 
 */

var remove = function(name) { 
	if(mvcc.isDefined(_controllers[name])) {
		delete _controllers[name]; 
	}
};

/* 
   #clear
   ========================================================================== */

/**
 * The `clear` function removes all controllers from the controllers collection.
 *
 * @name mvcc.com.clear
 */

var clear = function() { _controllers = {}; };

/* 
   #init
   ========================================================================== */

/**
 * The `init` function initializes the controller.
 *
 * @name mvcc.com.clear
 */

var init = function(name) { 
	if(mvcc.isDefined(_controllers[name].init)) {
		_controllers[name].init();
	}
};

/* 
   exports
   ========================================================================== */

return {
	create: create,
	remove: remove,
	item: _controllers,
	init: init
};

})();
