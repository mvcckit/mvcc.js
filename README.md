![logo](docs/img/logo.png)

# mvcc.js

The javascript used for internal Moraine Valley Community College web applications. It is still under development.

* [API Documentation](docs/api/api.md)
* [WatchJS Documentiation](https://github.com/melanke/Watch.JS)
* [Change Log](CHANGELOG.md)

## Building mvcc.js

Once you have your environment setup, run:

    grunt

## Including mvcc.js

Paste this snippet before the closing `body` tag:

	<script src="https://cdn.rawgit.com/mvcckit/mvcc.js/0.0.1/builds/mvcc.min.js"></script>

## A Quick Example

	<html>
		<body>
			<say-hello> </say-hello>

			<script>
				mvcc.com.create({
					draw: function(el) {
						return "Hello World";
					}
				}, 'say-hello');

				mvcc.com.render('say-hello');
			</script>
		</body>
	</html>

## Brower Support

| Browser | Version |
| ------- | ------- |
| IE      | 9+      |
| Chrome  | 7+      |
| Firebox | 4+      |
| Safari  | 5+      |
| Opera   | 12+     |
