app.service('searchService', function() {
	var searchQuery = {
		search: null, // Text search
		manufacturer: null,
		minPrice: null,
		maxPrice: null,
		caliber: null,
		gunType: null
	};

	/** Resets the search */
	this.resetSearch = function() {
		searchQuery = {
			search: null, // Text search
			manufacturer: null,
			minPrice: null,
			maxPrice: null,
			caliber: null,
			gunType: null
		};
	};

	/** Updates the search parameters */
	this.setSearch = function(newQuery) {
		console.log("Setting search with ", newQuery);
		// Iterate all keys in query object
		for(var name in searchQuery)
		{
			console.log("Checking " + name);
			// Override values if they are set
			console.log("Passed in: " + newQuery[name]);
			searchQuery[name] = newQuery[name] || searchQuery[name];
			console.log("Now: " + searchQuery[name]);
		}
	};

	this.getSearch = function() {
		return searchQuery;
	};
});