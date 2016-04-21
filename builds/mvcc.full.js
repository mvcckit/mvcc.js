var mvcc;

/* ==========================================================================
   #PREFIX
   ========================================================================== */

(function (mvcc) {	

	'use strict';

/* ==========================================================================
   #CORE
   ========================================================================== */

/* 
   #isString
   ========================================================================== */

/**
 * Determines if a reference is a string.
 */

mvcc.isString = function(value) { return typeof value === 'string'; };

/* 
   #isNumber
   ========================================================================== */

/**
 * Determines if a reference is a number.
 */

mvcc.isNumber = function(value) { return typeof value === 'number'; };

/* 
   #isBoolean
   ========================================================================== */

/**
 * Determines if a reference is a boolean.
 */

mvcc.isBoolean = function(value) { return typeof value === 'boolean'; };

/* 
   #isArray
   ========================================================================== */

/**
 * Determines if a reference is an Array.
 */

mvcc.isArray = function(value) { return value.constructor === Array; };

/* 
   #isFunction
   ========================================================================== */

/**
 * Determines if a reference is a Function.
 */

mvcc.isFunction = function(value) { return typeof value === 'function'; };

/* 
   #isObject
   ========================================================================== */

/**
 * Determines if a reference is an Object.
 */

mvcc.isObject = function(value) { return typeof value === 'object'; };

/* 
   #isDate
   ========================================================================== */

/**
 * Determines if a reference is a Date.
 */

mvcc.isDate = function(value) { return Object.prototype.toString.call(value) === '[object Date]'; };

/* 
   #isDefined
   ========================================================================== */

/**
 * Determines if a reference is defined.
 */

mvcc.isDefined = function(value) { return typeof value !== 'undefined'; };

/* 
   #isUndefined
   ========================================================================== */

/**
 * Determines if a reference is undefined.
 */

mvcc.isUndefined = function(value) { return typeof value === 'undefined'; };

/* 
   #concat
   ========================================================================== */

/**
 * Concatenates arguments into a String.
 */

mvcc.concat = function() { return Array.prototype.slice.call(arguments).join(""); };

/* 
   #extend
   ========================================================================== */

/**
 * Copies properties from one object to another.
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
 * Replaces handlebars in a string from an object.
 */

mvcc.template = function(content, values) {
   return content.replace(/{{(.+?)}}/g, function(match, prop) {
      return prop.split('.').reduce(function(obj, key) { 
         return mvcc.isFunction(obj[key]) ? obj[key]() : obj[key];
      }, values);
   });  
};

/* ==========================================================================
   #HTTP
   ========================================================================== */

mvcc.http = (function () {

/* 
   #request
   ========================================================================== */

/**
 * Executes a http request.
 */

var request = function(options) {
	var xhr = new window.XMLHttpRequest();

	xhr.open(options.method, options.url, true, options.username, options.password);
	
	return {
		then: function(success, failure) {
			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4) {
					if(xhr.status == 200) {
						if(mvcc.isFunction(success)) {
							success(xhr.responseText);
						}
					}
				}
				else {
					if(mvcc.isFunction(failure)) {
						failure(xhr.statusText);
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
 * Executes a http GET request.
 */

var get = function(url, options) {
	options = { method: 'GET', url: url } || options;
	return {
		then: function(success, failure) {
			mvcc.http.request(options).then(success, failure);
		}
	};
};

/* 
   #del
   ========================================================================== */

/**
 * Executes a http DELETE request.
 */

var del = function(url, options) {
   options = { method: 'DELETE', url: url} || options;
   return {
      then: function(success, failure) {
         mvcc.http.request(options).then(success, failure);
      }
   };
};

/* 
   #head
   ========================================================================== */

/**
 * Executes a http HEAD request.
 */

var head = function(url, options) {
	options = { method: 'HEAD', url: url } || options;
	return {
		then: function(success, failure) {
			mvcc.http.request(options).then(success, failure);
		}
	};
};

/* 
   #jsonp
   ========================================================================== */

/**
 * Executes a http JSONP request.
 */

var jsonp = function(url, options) {
   options = { method: 'JSONP', url: url} || options;
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
 * Executes a http POST request.
 */

var post = function(url, data, options) {
   options = { method: 'POST', url: url, data: data} || options;
   return {
      then: function(success, failure) {
         mvcc.http.request(options).then(success, failure);
      }
   };
};

/* 
   #put
   ========================================================================== */

/**
 * Executes a http PUT request.
 */

var put = function(url, data, options) {
   options = { method: 'PUT', url: url, data: data} || options;
   return {
      then: function(success, failure) {
         mvcc.http.request(options).then(success, failure);
      }
   };
};

/* 
   #patch
   ========================================================================== */

/**
 * Executes a http PATCH request.
 */

var patch = function(url, data, options) {
   options = { method: 'PATCH', url: url, data: data} || options;
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
 * Include external content in a container.
 */

var include = function(url, selector, success, failure) {
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
	del: del,
	head: head,
	jsonp: jsonp,
	post: post,
	put: put,
	patch: patch,
	include: include
};

})();	
/* ==========================================================================
   #COM
   ========================================================================== */

mvcc.com = (function () {

/**
 * The component collection
 */

var _components = {};

/* 
   #create
   ========================================================================== */

/**
 * Adds a component to the component collection.
 */

var create = function(fn, name) { 
    _components[name] = fn;
};

/* 
   #remove
   ========================================================================== */

/**
 * Removes a component from the component collection.
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
 * Removes all components from the component collection.
 */

var clear = function() { _components = {}; };

/* 
   #contains
   ========================================================================== */

/**
 *  Determines if the component collection contains a component.
 */

var contains = function(key) { return mvcc.isDefined(_components[key]); };

/* 
   #render
   ========================================================================== */

/**
 * Renders a component on the webpage.
 */

var render = function(name) { 

    var component = _components[name], els = document.querySelectorAll(component.selector);

    /**
     * Iterate through the matches.
     */

    for(var index = 0, length = els.length; index < length; index++) {

        var el = els[index];

        /**
         * Init function
         */

        if (mvcc.isFunction(component.init)) { 
            component.init(el); 
        }

        /**
         * Draw function
         */

        if (mvcc.isFunction(component.draw)) { 
            el.innerHTML = mvcc.template(component.draw(el), component); 
        }

        /**
         * Done function
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
 * Renders all components to the page.
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
    item: _components,
    create: create,
    remove: remove,
    clear: clear,
    contains: contains,
    render: render,
    renderAll: renderAll
};

})();	
/* ==========================================================================
   #MODEL
   ========================================================================== */

var Model = (function () {

/* 
   #constructor
   ========================================================================== */

/**
 * Set attributes when creating an instance of the model.
 */

function Model(keys) {
	this._cbs = {};
	this._keys = keys;

    /**
     * Init function
     */

	if(mvcc.isFunction(keys.init)) {
		keys.init(); 
	}
}

/* 
   #get
   ========================================================================== */

/**
 * Gets an attribute.
 */

Model.prototype.get = function(key) {
	return this._keys[key];
};

/* 
   #set
   ========================================================================== */

/**
 * Sets an attribute.
 */

Model.prototype.set = function (key, value) {
    this._keys[key] = value;
    if (this._cbs[key]) {
        this._cbs[key].forEach(function (cb) {
            cb(value);
        });
    }
};

/* 
   #on
   ========================================================================== */

/**
 * Observe an attribute for changes.
 */

Model.prototype.on = function (key, cb) {
    if (!this._cbs[key]) {
        this._cbs[key] = [];
    }
    this._cbs[key].push(cb);
};

/* 
   #un
   ========================================================================== */

/**
 * Stop observing an attribute for changes.
 */

Model.prototype.un = function (key) {
	if (mvcc.isFunction(this._cbs[key])) {
    	delete this._cbs[key];
    }
};

/* 
   #each
   ========================================================================== */

/**
 * Iterate through the keys.
 */

Model.prototype.each = function(cb) {
	for(var key in this._keys) {
		cb(key, this.get(key));
	}
};

/* 
   #contains
   ========================================================================== */

/**
 *  Determines if the Model contains the specified key
 */

Model.prototype.contains = function(key) {
	return key in this._keys;
};

/* 
   return
   ========================================================================== */

return Model;

}());

mvcc.Model = Model;

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
/* ==========================================================================
   #COM
   ========================================================================== */

mvcc.request = (function () {

/* 
   #isString
   ========================================================================== */

/**
 * Determines if a reference is a string.
 */
var queryString = function(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
};

/* 
   exports
   ========================================================================== */

return {
    queryString: queryString
};

})();	
	mvcc.route.listen();
	
/* ==========================================================================
   #SUFFIX
   ========================================================================== */

})(mvcc || (mvcc = {}));

/* ==========================================================================
   #DIRECTIVES
   ========================================================================== */


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