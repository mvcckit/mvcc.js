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