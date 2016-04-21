module.exports = function(grunt) {
	grunt.initConfig({
   		concat: {
			js: {
				src: [
					'src/mvcc.prefix.js',
					'src/modules/core.js',	
					'src/modules/http.js',	
					'src/modules/com.js',	
					'src/modules/model.js',	
					'src/modules/collection.js',											
					'src/modules/route.js',	
					'src/modules/request.js',						
				    'src/mvcc.suffix.js',
				    'src/directives/*.js'
				],
				dest: 'builds/mvcc.full.js'
			}
   		},
	    jshint: {
	      	files: ['builds/mvcc.full.js'],
	    },   		
   		uglify: {
   			js: {
   				src: 'builds/mvcc.full.js',
   				dest: 'builds/mvcc.min.js'
   			},
   		}
	});

 	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');

 	grunt.registerTask('default', ['concat', 'jshint', 'uglify']);
}