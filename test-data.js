// -------------------------------------------
// DEPENDENCIES
// -------------------------------------------
var user = require('./models/user');
var listing = require('./models/listing');
var firearm = require('./models/firearm');
var mongoose = require('mongoose');

// -------------------------------------------
// SETUP
// -------------------------------------------
mongoose.connect('mongodb://localhost:27017/firearm_listings');
mongoose.set('debug', true);

// -------------------------------------------
// TEST DATA
// -------------------------------------------
var testUser1 = {
	username: 'kringle',
	password: 'abc123',
	name: 'Kris Kringle',
	location: {
		address1: '123 Merry Way',
		city: 'Pittsburg',
		state: 'PA',
		zip: '12345'
	},
	email: 'nope@nope.net',
	phone: '123-456-7890',
	accountType: 'Business',
	profileImageUrl: 'http://placehold.it/200x200',
	isActive: true
};

user.User(testUser1).save(function(err) {
	if(err)
		console.error("Couldn't save test user 1: ", err);
});

var testUser2 = {
	username: 'elf',
	password: '321cba',
	name: 'Little Elf',
	location: {
		address1: '321 Merry Way',
		city: 'North Pole',
		state: 'AK',
		zip: '54321'
	},
	email: 'elf@claus.net',
	phone: '(123) 456-7890',
	accountType: 'Personal',
	profileImageUrl: 'http://placehold.it/200x200',
	isActive: false
};

user.User(testUser2).save(function(err) {
	if(err)
		console.error("Couldn't save test user 2: ", err);
});

var testListing1 = {
	title: "Like-new AK-47",
	gunTypeId: "abc123",
	customGunSpecs: {
		"Scope": "Bushnell",
		"Trigger": "Bravo"
	},
	description: "This is a like-new firearm. Bought " +
	"it a few years back, only took it to the range twice. " +
	"Price is firm.",
	price: 1024.13,
	photos: [
		{
			url: 'http://placehold.it/200x200',
			description: 'Side view'
		},
		{
			url: 'http://placehold.it/200x200'
		}
	],
	userId: "abc123",
	isSold: false,
	isActive: true
};

listing.Listing(testListing1).save(function(err) {
	if(err)
		console.error("Couldn't save test listing: ", err);
})