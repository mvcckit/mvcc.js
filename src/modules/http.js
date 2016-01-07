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
   exports
   ========================================================================== */

return {
	request: request,
	get: get,
	post: post
};

})();
