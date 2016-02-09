/* ==========================================================================
   #COM 
   ========================================================================== */

mvcc.route = (function () {

/**
 * The components collection
 */

var _routes = {};

/* 
   #map
   ========================================================================== */

/**
 * The `map` function creates a new route in the routes collection.
 *
 * @name mvcc.route.create
 *
 * @param {string} name
 *
 *     The fragment identifier.
 *
 * @param {function} fn
 *
 *     The callback function.
 */

var map = function(name, fn) { _routes[name] = fn; };

/* 
   #unmap
   ========================================================================== */

/**
 * The `unmap` function removes a route from the routes collection.
 *
 * @name mvcc.route.remove
 *
 * @param {string} name
 *
 *     The fragment identifier.
 */

var unmap = function(name) { 
   if (mvcc.isDefined(_routes[name])) {
      delete _routes[name]; 
   }
};

/* 
   #clear
   ========================================================================== */

/**
 * The `clear` function removes all routes from the route collection.
 *
 * @name mvcc.route.clear
 */

var clear = function() { _routes = {}; };

/* 
   #call
   ========================================================================== */

/**
 * The `call` function executes a route in the route collection.
 *
 * @name mvcc.route.call
 *
 * @param {string} name
 *
 *     The fragment identifier.
 */

var call = function(name) { 
   /**
    * Ignore case when doing the match.
    */
   if (mvcc.isDefined(_routes[name.toLowerCase()])) {
      _routes[name.toLowerCase()](); 
   }
};

/* 
   #path
   ========================================================================== */

/**
 * The `path` function returns a value inside the route path.
 *
 * @name mvcc.route.path(index)
 *
 * @param {number} index
 *
 *     The index number.
 * 
 * @return {string} 
 *
 *     The value.
 */

var path = function(index) {
   if(mvcc.isPath(location.hash)) {
      return location.hash.subString(0, 2).split('/')[index];
   }
   return "";
};

/* 
   #listen
   ========================================================================== */

/**
 * The `listen` function watches the url for changes and calls routes.
 *
 * @name mvcc.route.listen
 */

var listen = function() { 
   window.addEventListener('load', dispatch);
   window.addEventListener('hashchange', dispatch);
};

/* 
   #ignore
   ========================================================================== */

/**
 * The `ignore` function stops watching the url for changes.
 *
 * @name mvcc.route.listen
 */

var ignore = function() { 
   window.removeEventListener('load', dispatch);
   window.removeEventListener('hashchange', dispatch);
};

/* 
   #dispatch
   ========================================================================== */

/**
 * The `dispatch` function dispatches the route without query parameters.
 *
 * @name mvcc.route.dispatch
 */

var dispatch = function() { call(location.hash.split("?")[0]); };

/* 
   exports
   ========================================================================== */

return {
	map: map,
	unmap: unmap,
	call: call,
   path: path,
   listen: listen,
   ignore: ignore,
   item: _routes
};

})();