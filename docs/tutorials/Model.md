# Models Guide

## Creating a Model

The `Model` constructor accepts a list of key-value pairs.

	<html>
		<body>
			<script src="../builds/mvcc.full.js"></script>
			<script>
				var Person = new mvcc.Model({
					'firstName': 'John',
					'lastName': 'Smith',					
				});
			</script>
		</body>
	</html>

## Getting Data

The `get` function allows you to read data from the model.

	<html>
		<body>
			<script src="../builds/mvcc.full.js"></script>
			<script>
				var Person = new mvcc.Model({
					'firstName': 'John',
					'lastName': 'Smith',					
				});
				console.log(Person.get('firstName'));
			</script>
		</body>
	</html>

## Setting Data

The `set` function allows you to change the value of a key, or add a new one.

	<html>
		<body>
			<script src="../builds/mvcc.full.js"></script>
			<script>
				var Person = new mvcc.Model({
					'firstName': 'John',
					'lastName': 'Smith',					
				});
				Person.set('firstName', 'Jane');

				console.log(Person.get('firstName'));
			</script>
		</body>
	</html>

## Observing Data

The `on` function observes a key and calls a function when it changes.

	<html>
		<body>
			<script src="../builds/mvcc.full.js"></script>
			<script>
				var Person = new mvcc.Model({
					'firstName': 'John',
					'lastName': 'Smith',					
				});

				Person.on('firstName', function(value) {
					alert('First name is now ' + value);
				});

				Person.set('firstName', 'Jane');
			</script>
		</body>
	</html>	