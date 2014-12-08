var mongoose = require('mongoose');

// -------------------------------------------
// SCHEMAS
// -------------------------------------------
var manufacturerSchema = mongoose.Schema({
	name: {type: String, required: true},
	aliases: [{type: String}],
	country: String,
	firearms: [
		{
			model: String,
			startYear: Date,
			endYear: Date,
			caliber: String,
			specs: [
				{
					name: String,
					value: String
				}
			]
		}
	]
});

// -------------------------------------------
// MODELS
// -------------------------------------------
var Manufacturer = mongoose.model('Manufacturer', manufacturerSchema);

// -------------------------------------------
// EXPORTS
// -------------------------------------------
exports.Manufacturer = Manufacturer;