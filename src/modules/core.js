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
