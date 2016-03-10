# Components

## What is a Component?

Components are JavaScript objects that typically contain a `draw` function.

	<html>
		<body>
		    <script src="/scripts/mvcc.full.js"></script>
    		<script>
				mvcc.com.create({
	                draw: function() {
	                    
	                }
				}, 'say-hello');
	    	</script>
		</body>
	</html>
	
**draw function**

The `draw` function returns a string containing the markup of the component.
	
	<html>
		<body>
		    
		    <script src="/scripts/mvcc.full.js"></script>
    		<script>
				mvcc.com.create({
	                draw: function() {
	                    return "<h1>Hello World</h1>"
	                }
				}, 'say-hello');
		    </script>
		</body>
	</html>
	
**render function**

The `render` function renders the component on a tag with the same name:
	
	<html>
		<body>
		    <say-hello></say-hello>
		    
    		<script src="/scripts/mvcc.full.js"></script>
    		<script>
				mvcc.com.create({
	                draw: function() {
	                    return "<h1>Hello World</h1>"
	                }
				}, 'say-hello');
				
				mvcc.com.render('say-hello');
	    	</script>
		</body>
	</html>

You can also render the component on a tag that has an attribute with the same name:

	<div say-hello></div>

**renderAll function**

The `renderAll` function will render all components on the webpage.

    mvcc.com.renderAll();
	
## Data Properties

Double-brackets will be replaced with the value of a component property.

	<html>
		<body>
		    <say-hello></say-hello>
		    
    		<script src="/scripts/mvcc.full.js"></script>
    		<script>
				mvcc.com.create({
				    name: 'World',
	                draw: function() {
	                    return "<h1>Hello {{name}}</h1>"
	                }
				}, 'say-hello');
				
				mvcc.com.render('say-hello');
	    	</script>
		</body>
	</html>

**Deep Nesting**

Deep nested properties are fully supported.

	mvcc.com.create({
	    name: {
	        firstName: 'John',
	        lastName: 'Doe'
	    },
        draw: function() {
            return "<h1>Hello {{name.firstName}}</h1>"
        }
	}, 'say-hello');

## Data Methods

Double-brackets can also be replaced with the value of a component function.

	<html>
		<body>
		    <say-hello></say-hello>
		    
    		<script src="/scripts/mvcc.full.js"></script>
    		<script>
				mvcc.com.create({
				    name: 'World',
				    greet: function() {
				        return "Hello"
				    },
	                draw: function() {
	                    return "<h1>{{greet}} {{name}}</h1>"
	                }
				}, 'say-hello');
				
				mvcc.com.render('say-hello');
	    	</script>
		</body>
	</html>	

## Script Templates

Script Templates can be used for components that contain a lot of markup.

	<html>
		<body>
			<say-hello> </say-hello>

			<script id="sayHello" type="text/template">
			    <h1>
			        {{greet}} {{name}}
			    </h1>
		    </script>

		    <script src="/scripts/mvcc.full.js"></script>
			<script>
				mvcc.com.create({
				    name: 'World',
				    greet: function() {
				        return "Hello";
				    },				    
					draw: function() {
						return document.getElementById("sayHello").innerHTML;
					}
				}, 'say-hello');

				mvcc.com.render('say-hello');
			</script>
		</body>
	</html>

Alternatively, you can also use the `mvcc.concat` function.

	<html>
		<body>
			<say-hello> </say-hello>

		    <script src="/scripts/mvcc.full.js"></script>
			<script>
				mvcc.com.create({
				    name: 'World',
				    greet: function() {
				        return "Hello";
				    },				    
					draw: function() {
						return mvcc.concat(
							"<h1>",
								"{{greet}} {{name}}",
							"</h1>"
						)
					}
				}, 'say-hello');

				mvcc.com.render('say-hello');
			</script>
		</body>
	</html>

## Event Handling

The `init` function can be used to initialize a component and setup listeners.

	<html>
		<body>
			<say-hello> </say-hello>

			<script id="sayHello" type="text/template">
			    <h1>
			        {{greet}} {{name}}
			    </h1>
		    </script>
		    
		    <script src="/scripts/mvcc.full.js"></script>
			<script>
				mvcc.com.create({
				    name: 'World',
				    greet: function() {
				        return "Hello";
				    },		
				    init: function(el) {
				        el.addEventListener('click', function() {
				           console.log('You clicked me.') ;
				        });
				    },
					draw: function() {
						return document.getElementById("sayHello").innerHTML;
					}
				}, 'say-hello');

				mvcc.com.render('say-hello');
			</script>
		</body>
	</html>
    