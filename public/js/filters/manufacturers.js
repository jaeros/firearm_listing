app.filter('manufacturers', function() {
	return function(input, manufacturers) {

		// input will be the string we pass in
		if (input) {
			input.customGunSpecs.foreach(function(spec) {
				if (spec.name === 'Manufacturers') {
					if (spec.value === manufacturers)
						return input;
				}
			});
		}
	}
});