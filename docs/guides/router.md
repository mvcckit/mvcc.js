# Building a Router

## Map Function

The `mvcc.route.map` function takes 2 arguments: the hash and a callback function.

	<html>
		<body>
			<ul>
				<li><a href="#/home">Home</a></li>
				<li><a href="#/help">Help</a></li>
			</ul>

			<main></main>

			<script src="/scripts/mvcc.full.js"></script>
			<script>
				mvcc.route.map('#/home', function() {

				});

				mvcc.route.map('#/help', function() {

				});				
			</script>
		</body>
	</html>
		

## Include Function

The `mvcc.http.include` function loads an external page into an element.

	<html>
		<body>
			<ul>
				<li><a href="#/home">Home</a></li>
				<li><a href="#/help">Help</a></li>
			</ul>

			<main></main>

			<script src="/scripts/mvcc.full.js"></script>
			<script>
				mvcc.route.map('#/home', function() {
					mvcc.http.include('home.html', 'main');
				});

				mvcc.route.map('#/help', function() {
					mvcc.http.include('help.html', 'main');
				});				
			</script>
		</body>
	</html>
		
