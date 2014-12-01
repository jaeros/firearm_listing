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
mongoose.set('debug', false);

// -------------------------------------------
// MAIN FUNCTION
// -------------------------------------------

function main(onFinish) {

	var that = this;
	var testFunctions = ['addTestUser1', 'addTestUser2', 'addTestListing'];

	this.runTest = function() {
		var f = testFunctions.pop();
		if(!f)
			onFinish()
		else
			eval(f)(that.runTest);
	};

	this.removeAll = function() {
		console.log("Removing all users...");
		user.User.remove({}, function(err) {
			if(err)
				console.error("Couldn't remove users: ", err);
		});
		console.log("Removing all listings...");
		listing.Listing.remove({}, function(err) {
			if(err)
				console.error("Couldn't remove listings: ", err);
		});
	};
}

var mainFunction = new main(function(){process.exit(0);});
mainFunction.removeAll();
mainFunction.runTest();

// -------------------------------------------
// TEST DATA
// -------------------------------------------
function addTestUser1(onComplete) {
	console.log("Adding test user 1...");
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

		onComplete();
	});
}

function addTestUser2(onComplete) {
	console.log("Adding test user 2...");
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
		onComplete();
	});
}

function addTestListing(onComplete) {
	console.log("Adding test listing 1...");
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
		onComplete();
	});
};

