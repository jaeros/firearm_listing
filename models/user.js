var mongoose = require('mongoose');

// -------------------------------------------
// VALIDATION DATA
// -------------------------------------------

var emailValidator = [function(val) {
	return /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/.test(val);
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
	name: {type: String, trim: true},
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
exports.User = User;