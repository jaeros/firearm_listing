var mongoose = require('mongoose');

// -------------------------------------------
// VALIDATION DATA
// -------------------------------------------

var accountTypeValidator = {
	values: ['Personal', 'Business'],
	message: '{VALUE} is not a valid value for {PATH}'
};

// -------------------------------------------
// SCHEMAS
// -------------------------------------------
var listingSchema = mongoose.Schema({
	title: String,
	gunType: String,
	customGunSpecs: [
		{
			name: String,
			value: String
		}
	],
	description: String,
	price: Number,
	photos: [
		{
			url: String,
			description: String
		}
	],
	pageViews: {type: Number, default: 0},
	listedOn: {type: Date, default: Date.now},
	refreshedOn: Date,
	promotion: {
		startDate: Date,
		endDate: Date,
		targetSearch: [
			{type: String}
		]
	},
	userId: String,
	isSold: Boolean,
	isActive: Boolean
});

// -------------------------------------------
// MODELS
// -------------------------------------------
var Listing = mongoose.model('Listing', listingSchema);

// -------------------------------------------
// EXPORTS
// -------------------------------------------
exports.Listing = Listing;
