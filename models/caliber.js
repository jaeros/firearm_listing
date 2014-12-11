var mongoose = require('mongoose');

// -------------------------------------------
// SCHEMAS
// -------------------------------------------
var caliberSchema = mongoose.Schema({
	name: {type: String, required: true},
	aliases: [{type: String}]
});

// -------------------------------------------
// MODELS
// -------------------------------------------
var Caliber = mongoose.model('Caliber', caliberSchema);

// -------------------------------------------
// EXPORTS
// -------------------------------------------
exports.Caliber = Caliber;