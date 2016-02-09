![logo](docs/img/logo.png)

# mvcc.js

The javascript used for internal Moraine Valley Community College web applications. It is still under development.

* [API Documentation](docs/api/api.md)

## Building mvcc.js

Once you have your environment setup, run:

    grunt

## A Quick Example

	<html>
		<body>
			<say-hello> </say-hello>

			<script>
				mvcc.com.create({
					draw: function(el) {
						return '<h1>Hello World</h1>';
					}
				}, 'say-hello');

				mvcc.com.render('say-hello');
			</script>
		</body>
	</html>

## Supported Browsers

| Browser            | Version |
| ------------------ | ------- |
| Internet Explorer  | 10+     |
| Edge               | 12+     |
| Firefox            | 42+     |
| Chrome             | 45+     |
| Safari             | 9+      |
| Opera              | 34+     |
| iOS Safari         | 8.4+    |
| Android Browser    | 4.4+    |
| Chrome for Android | 47+     |


