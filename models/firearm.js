var mongoose = require('mongoose');

// -------------------------------------------
// SCHEMAS
// -------------------------------------------
var firearmSchema = mongoose.Schema({
	manufacturer: String,
	model: String,
	caliber: String
});

// -------------------------------------------
// MODELS
// -------------------------------------------
var Firearm = mongoose.model('Firearm', firearmSchema);

// -------------------------------------------
// EXPORTS
// -------------------------------------------
exports.Firearm = Firearm;