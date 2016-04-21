# Components Guide

## Create Function

The `mvcc.com.create` function takes 2 arguments: the `options` and component name.

	<html>
		<body>
			<hello-world></hello-world>

			<script src="/scripts/mvcc.full.js"></script>
			<script>
				mvcc.com.create({

				}, 'hello');
			</script>
		</body>
	</html>
		

## Selector Option

The `selector` option is the selector string used to render the component on the webpage.

	<html>
		<body>
			<hello-world></hello-world>

			<script src="/scripts/mvcc.full.js"></script>
			<script>
				mvcc.com.create({
					selector: 'hello-world'
				}, 'hello');
			</script>
		</body>
	</html>
		

## Draw Option

The `draw` option is a function that returns the innerHTML of the component.

	<html>
		<body>
			<hello-world></hello-world>

			<script src="/scripts/mvcc.full.js"></script>
			<script>
				mvcc.com.create({
					selector: 'hello-world',
					draw: function (el) {
						return "<h1>Hello World</h1>"
					}
				}, 'hello');
			</script>
		</body>
	</html>
		

## Render Function

The `mvcc.com.render` function is used to render the component on the page.

	<html>
		<body>
			<hello-world></hello-world>
					
			<script src="/scripts/mvcc.full.js"></script>
			<script>
				mvcc.com.create({
					selector: 'hello-world',
					draw: function (el) {
						return "<h1>Hello World</h1>"
					}
				}, 'hello');
				mvcc.com.render('hello');
			</script>
		</body>
	</html>
		

## Custom Options

You can write custom options and use them in your `draw` function's return string.

	<html>
		<body>
			<hello-world></hello-world>
					
			<script src="/scripts/mvcc.full.js"></script>
			<script>
				mvcc.com.create({
					selector: 'hello-world',
					name: 'MVCC',
					draw: function (el) {
						return "<h1>Hello {{name}}</h1>"
					}
				}, 'hello');
				mvcc.com.render('hello');
			</script>
		</body>
	</html>