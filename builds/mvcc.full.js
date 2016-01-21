/**
 * mvcc.js
 * Copyright 2016, Eric Harms
 * Released under the MIT license
 */

/* ==========================================================================
   #GLOBALS
   ========================================================================== */

/**
 * Global declarations.
 */

 var mvcc;

/* ==========================================================================
   #INTRO
   ========================================================================== */

/**
 * Begin the code enclosure. 
 */

(function (mvcc) {	
/* ==========================================================================
   #CORE
   ========================================================================== */

/* 
   #isString
   ========================================================================== */

/**
 * The `isString` function determines if the reference is a `String`.
 *
 * @name mvcc.isString
 *
 * @param {*} value
 *
 *     The reference to check.
 *
 * @returns {boolean} 
 *
 *     The function returns true if the `value` is a `String`.
 */

mvcc.isString = function(value) { return typeof value === 'string'; };

/* 
   #isNumber
   ========================================================================== */

/**
 * The `isNumber` function determines if the reference is a `Number`.
 *
 * @name mvcc.isNumber
 *
 * @param {*} value
 *
 *     The reference to check.
 *
 * @returns {boolean} 
 *
 *     The function returns true if the `value` is a `Number`.
 */

mvcc.isNumber = function(value) { return typeof value === 'number'; };

/* 
   #isBoolean
   ========================================================================== */

/**
 * The `isBoolean` function determines if the reference is a `Boolean`.
 *
 * @name mvcc.isBoolean
 *
 * @param {*} value
 *
 *     The reference to check.
 *
 * @returns {boolean} 
 *
 *     The function returns true if the `value` is a `Boolean`.
 */

mvcc.isBoolean = function(value) { return typeof value === 'boolean'; };

/* 
   #isArray
   ========================================================================== */

/**
 * The `isArray` function determines if the reference is an `Array`.
 *
 * @name mvcc.isArray
 *
 * @param {*} value
 *
 *     The reference to check.
 *
 * @returns {boolean} 
 *
 *     The function returns true if the `value` is an `Array`.
 */

mvcc.isArray = function(value) { return value.constructor === Array; };

/* 
   #isFunction
   ========================================================================== */

/**
 * The `isFunction` function determines if the reference is a `Function`.
 *
 * @name mvcc.isFunction
 *
 * @param {*} value
 *
 *     The reference to check.
 *
 * @returns {boolean} 
 *
 *     The function returns true if the `value` is a `Function`.
 */

mvcc.isFunction = function(value) { return typeof value === 'function'; };

/* 
   #isObject
   ========================================================================== */

/**
 * The `isObject` function determines if the reference is an `Object`.
 *
 * @name mvcc.isObject
 *
 * @param {*} value
 *
 *     The reference to check.
 *
 * @returns {boolean} 
 *
 *     The function returns true if the `value` is an `Object`.
 */

mvcc.isObject = function(value) { return typeof value === 'object'; };

/* 
   #isDefined
   ========================================================================== */

/**
 * The `isDefined` function determines if the reference is defined.
 *
 * @name mvcc.isDefined
 *
 * @param {*} value
 *
 *     The reference to check.
 *
 * @returns {boolean} 
 *
 *     The function returns true if the `value` is defined.
 */

mvcc.isDefined = function(value) { return typeof value !== 'undefined'; };

/* 
   #isUndefined
   ========================================================================== */

/**
 * The `isUndefined` function determines if the reference is undefined.
 *
 * @name mvcc.isUndefined
 *
 * @param {*} value
 *
 *     The reference to check.
 *
 * @returns {boolean} 
 *
 *     The function returns true if the `value` is undefined.
 */

mvcc.isUndefined = function(value) { return typeof value === 'undefined'; };

/* 
   #extend
   ========================================================================== */

/**
 * The `extend` function copies properties from the `source` object to `target`
 *
 * @name mvcc.extend
 *
 * @param {Object} target
 *
 *     The target object.
 *
 * @param {Object} source
 *
 *     The source object.
 *
 * @returns {Object}
 *
 *     The reference to `target`.
 */

mvcc.extend = function(target, source) {
   for(var prop in source) {
      if(source.hasOwnProperty(prop)) { 
         target[prop] = source[prop]; 
      }
   }
   return target;
};

/* 
   #template
   ========================================================================== */

/**
 * The `template` function replaces handlebars in a string with object values.
 *
 * @name mvcc.extend
 *
 * @param {String} content
 *
 *     The string containing the handlebars.
 *
 * @param {Object} values
 *
 *     The object.
 *
 * @returns {String}
 *
 *     The content with the handlebars replaced.
 */

mvcc.template = function(content, values) {
   return content.replace(/{{(.+?)}}/g, function(match, prop) {
      return prop.split('.').reduce(function(obj, key) { 
         return mvcc.isFunction(obj[key]) ? obj[key]() : obj[key];
      }, values);
   });  
};
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

		var el = els[index];

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
			el.innerHTML = mvcc.template(component.draw(el), component); 
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

var map = function(name, fn) { _routes[name.toLowerCase] = fn; };

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
   if (mvcc.isDefined(_routes[name.toLowerCase])) {
      _routes[name.toLowerCase](); 
   }
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
   listen: listen,
   ignore: ignore,
   item: _routes
};

})();
/* ==========================================================================
   #HTTP 
   ========================================================================== */

mvcc.http = (function () {

/* 
   #request
   ========================================================================== */

/**
 * The `request` function executes a http request.
 *
 * @name mvcc.http.request
 *
 * @param {Object} options.
 *
 *     The request options.
 */

var request = function(options) {
	var xhr = new window.XMLHttpRequest();

	xhr.open(
		options.method,
		options.url,
		true,
		options.username,
		options.password
	);

	return {
		then: function(success, failure) {
			xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                    	if(mvcc.isFunction(success)) {
                       		success(xhr.responseText);
                    	}
                    }
                    else {
                    	if(mvcc.isFunction(failure)) {
                       		failure(xhr.statusText);
                      	}
                    }
                }
            };
			xhr.send(options.data);
		}
	};
};

 /* 
   #get
   ========================================================================== */

/**
 * The get function executes a http get request.
 *
 * @name mvcc.http.get
 *
 * @param {String} url.
 *
 *     The url of the page or file.
 *
 * @param {Object} options.
 *
 *     The options to use in the request.
 */

var get = function(url, options) {
   	options = options || {};	
	options.method = "GET";	
	options.url = url;

	return {
		then: function(success, failure) {
			mvcc.http.request(options).then(success, failure);
		}
	};
};

/* 
   #post
   ========================================================================== */

/**
 * TThe get function executes a http post request.
 *
 * @name mvcc.http.post
 *
 * @param {String} url.
 *
 *     The url of the page or file.
 *
 * @param {*} data.
 *
 *     The data to send.
 * 
 * @param {Object} options.
 *
 *     The options to use in the request.
 */

var post = function(url, data, options) {
   	options = options || {};	
	options.method = "POST";	
	options.url = url;
	options.data = data;

	return {
		then: function(success, failure) {
			mvcc.http.request(options).then(success, failure);
		}
	};
};

/* 
   #include
   ========================================================================== */

/**
 * The `include` function loads external content in a container.
 *
 * @name mvcc.util.include
 *
 * @param {string} url
 *
 *     The URL of the page or file.
 *
 * @param {string} selector
 *
 *     The selector to find the container. 
 *
 * @param {function} [success]
 *
 *     The success callback.
 *
 * @param {function} [failure]
 *
 *     The failure callback.
 */

var include = function(url, selector, success) {
   mvcc.http.get(url).then(function(data) {
		document.querySelector(selector).innerHTML = data;
      	if(mvcc.isFunction(success)) {
        	   success();
      	}  
   }, function() {
         if(mvcc.isFunction(failure)) {
            failure();
         }  
   });
};

/* 
   exports
   ========================================================================== */

return {
	request: request,
	get: get,
	post: post,
	include: include
};

})();

/* ==========================================================================
   #LISTEN
   ========================================================================== */

/**
 * Begin listening for routes.
 */
 
mvcc.route.listen();

/* ==========================================================================
   #OUTRO
   ========================================================================== */

/**
 * End the code enclosure. 
 */

})(mvcc || (mvcc = {}));
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
        mvcc.http.get(el.getAttribute('mv-repeat')).then(function (data) {
            that.load(el, JSON.parse(data));
        });
    },
    load: function (el, data) {
        var target = '', template = el.innerHTML;
        for (var prop in data) {
            target += mvcc.template(template, data[prop]);
        }
        el.innerHTML = target;
        el.removeAttribute('mv-cloak');
    }
}, 'mv-repeat');
