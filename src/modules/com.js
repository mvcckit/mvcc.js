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