> This is obsolete. Use the [mvcc.js](https://github.com/mvcckit/mvcc.ts) repro for new projects.

![logo](docs/img/logo.png)

# mvcc.js

The JavaScript framework used for internal Moraine Valley Community College web applications. 

* [Developer Guides](docs/guides/guides.md)
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
					selector: 'say-hello'
					draw: function(el) {
						return '<h1>Hello World</h1>';
					}
				}, 'hello');

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


