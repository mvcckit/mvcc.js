/* ==========================================================================
   #UTIL
   ========================================================================== */

mvcc.util = (function () {

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
	include: include
};

})();