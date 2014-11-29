var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/firearm_listings');

// -------------------------------------------
// VALIDATION DATA
// -------------------------------------------

var emailValidator = [function(val) {
	return /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/.test(val);
}, '{PATH} is not a valid email.'];

var accountTypeValidator = {
	values: ['Personal', 'Business'],
	message: '{VALUE} is not a valid value for {PATH}'
};

// -------------------------------------------
// SCHEMAS
// -------------------------------------------
var userSchema = mongoose.Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
	name: {
		first: {type: String, required: true, trim: true},
		last: {type: String, required: true, trim: true}
	},
	location: {
		address1: String,
		address2: String,
		city: String,
		state: String,
		zip: Number
	},
	email: {type: String, validate: emailValidator},
	phone: String,
	accountType: {type: String, enum: accountTypeValidator},
	profileImageUrl: String,
	isActive: Boolean
});

// -------------------------------------------
// MODELS
// -------------------------------------------
var User = mongoose.model('User', userSchema);

// -------------------------------------------
// EXPORTS
// -------------------------------------------
exports.user = User;