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