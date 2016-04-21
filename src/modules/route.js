/* ==========================================================================
   #ROUTE
   ========================================================================== */

mvcc.route = (function () {

/**
 * The route collection
 */

var _routes = {};

/* 
   #dispatch
   ========================================================================== */

/**
 * Used by the listen and ignore function to disbatch routes.
 */

var dispatch = function() { call(location.hash); };

/* 
   #map
   ========================================================================== */

/**
 * Adds a route to the route collection.
 */

var map = function(name, fn) { _routes[name] = fn; };

/* 
   #unmap
   ========================================================================== */

/**
 * Removes a route from the route collection.
 */

var unmap = function(name) { 
    if(mvcc.isDefined(_routes[name])) {
        delete _routes[name]; 
    }
};

/* 
   #clear
   ========================================================================== */

/**
 * Removes all routes from the route collection.
 */

var clear = function() { _routes = {}; };


/* 
   #call
   ========================================================================== */

/**
 * Calls a route's callback function.
 */

var call = function(route) {
	for(var item in _routes) {
		if(route.toLowerCase().substring(0, item.length) === item.toLowerCase()) {
			_routes[item]();
		}
	}
};

/* 
   #listen
   ========================================================================== */

/**
 * Listen for route changes.
 */

var listen = function() { 
    window.addEventListener('load', dispatch);
    window.addEventListener('hashchange', dispatch);
};

/* 
   #ignore
   ========================================================================== */

/**
 * Stop listening for route changes.
 */

var ignore = function() { 
    window.removeEventListener('load', dispatch);
    window.removeEventListener('hashchange', dispatch);
};

/* 
   exports
   ========================================================================== */

return {
	item: _routes,
	map: map,
	unmap: unmap,
	clear: clear,
	call: call,
	listen: listen,
	ignore: ignore
};

})();	