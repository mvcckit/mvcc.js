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
