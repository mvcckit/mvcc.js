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