// -------------------------------------------
// DEPENDENCIES
// -------------------------------------------
var express = require('express');
var model = require('../models/listing');
var user = require('../models/user');
var router = express.Router();
var jwt = require('express-jwt');
var config = require('config');
var email   = require("../node_modules/emailjs/");

// -------------------------------------------
// SETUP
// -------------------------------------------
var Listing = model.Listing;
var User = user.User;
var _secret = config.get('secret');

// -------------------------------------------
// ENDPOINTS
// -------------------------------------------

/* Create new listing */
/* PROTECTED */
router.post('/', jwt({secret: _secret}), function(req, res) {

  console.log("User: ", req.user);

  var listing = Listing(req.body);

  listing.save(function(err) {
	if(err)
	  res.status(400).send('Invalid listing');
	else
	  res.status(201)
		 .set('Location', '/listings/' + listing._id)
		 .send(listing);
  });
});

/* GET all listings */
router.get('/', function(req, res) {

  // Construct listing query
  var queryObj = new ListingSearch();
  queryObj.setMinPrice(req.query['minPrice']);
  queryObj.setMaxPrice(req.query['maxPrice']);
  queryObj.setManufacturer(req.query['manufacturer']);
  queryObj.setCaliber(req.query['caliber']);
  queryObj.setUserId(req.query['userId']);
  queryObj.setSearchString(req.query['search']);
  queryObj.setGunType(req.query['gunType']);

  console.log("Mongo query: ", queryObj.getQuery());

  Listing
  	.find(queryObj.getQuery())
  	.limit(100)
  	.exec(function(err, docs) {
  		if(err)
  			res.status(500).send("Couldn't retrieve listings");
  		else
  		{
  			res.status(200).send(docs);
  			console.log("Results: " + docs.length);
  		}
  	});
});

var queryParams = [];

/* GET a listing based on the listing's id */
router.get('/:listingId', queryParams, function(req, res) {
  listingId = req.params.listingId;
  console.log(listingId);

  Listing.find({'_id': listingId}, function(err, docs) {
    console.log(err);

  	if(docs)
  	  res.status(200).send(docs[0]);
  	else if (err)
  	  res.status(500).send('Could not retrieve listing');
  	else
  	  res.status(404).send('Specified listing not found');
  });
});

/* POST a message to a seller */
router.post('/:listingId/message/', function(req,res) {

	console.log("Body: ", req.body);

	var server  = email.server.connect({
	   user:    config.get('email.user'), 
	   password:config.get('email.password'),
	   host:    config.get('email.host'),
	   ssl:     true
	});

	// Find the specified listing to get the owner
	Listing.findOne({_id: req.params.listingId}, function(err, listingDoc) {
		if(err)
		{
			res.status(500).send('Could not update listing');
		}
		else if(!listingDoc)
		{
			res.status(400).send("Couldn't find specified listing.");
		}
		else
		{
			var userId = listingDoc.userId;

			// Get the user's email
			User.findOne({_id: userId}, function(err, userDoc) {
				if(err)
				{
					res.status(500).send('Couldn\'t find contact information!');
				}
				else if(!userDoc)
				{
					res.status(400).send("Couldn't find listing owner!");
				}
				else
				{
					// send the message and get a callback with an error or details of the message that was sent
					server.send({
					   // text:    req.body.text, 
					   text: 'test text',
					   from:    "firearm.listings@gmail.com", 
					   to:      userDoc.email,
					   subject: "Contact Regarding Listing - " + listingDoc.title
					}, function(err, message) { 
						if(err)
						{
							res.status(500).send("Message could not be sent.");
							console.error(err);
						}
						else
						{
							res.status(200).send("Message sent successfully");
						}
					});
				}
			});
		}
	});

	

});

/* UPDATE an existing listing */
router.put('/:listingId', function(req, res) {
	var listing = req.body;
  console.log(listing);

	// We have to update manually because mongoose's update function
	// 	doesn't run validators on update command (cool, huh?)
	Listing.findOne({'_id': req.params.listingId}, function(err, doc) {
		if(err)
		{
			res.status(500).send('Could not update listing');
		}
		else if(!doc)
		{
			// Document not found, create a new document
			var newListing = Listing(listing);
			newListing.save(function(err) {
				if(err)
					res.status(400).send('Invalid listing');
				else
					res.status(200).send(newListing);
			});
		}
		else
		{
			doc.title = listing.title;
			doc.gunType = listing.gunType;
			doc.customGunSpecs = listing.customGunSpecs;
			doc.description = listing.description;
			doc.price = listing.price;
			doc.photos = listing.photos;
			doc.pageViews = listing.pageViews;
			doc.listedOn = listing.listedOn;
			doc.refreshedOn = listing.refreshedOn;
			doc.promotion = listing.promotion;
			doc.userId = listing.userId;
			doc.isSold = listing.isSold;
			doc.isActive = listing.isActive;
			doc.save(function(err) {
				if(err)
				{
					console.log(err);
					res.status(400).send('Listing could not be created/updated.');
				}
				else
				{
					res.status(204).send('');
				}
			});
		}
	});

});

// router.put('/:listingId/addView', function(req, res) {
// 	Listing.findByIdAndUpdate(id, {$inc: {pageViews: 1}}, function(err, doc) {
		
// 	});
// });

module.exports = router;

// -------------------------------------------
// HELPER FUNCTIONS AND CLASSES
// -------------------------------------------

function ListingSearch() {

	var filterManufacturer = null;
	var filterCaliber = null;
	var filterMinPrice = null;
	var filterMaxPrice = null;
	var filterUserId = null;
	var searchTerms = [];
	var filterType = null;

	this.setSearchString = function(search) {
		if(!search)
			return;
		searchTerms = search.split(' ');
	};

	this.setManufacturer = function(m) {
		if(typeof m !== 'undefined')
			filterManufacturer = m;
	};

	this.setCaliber = function(c) {
		if(typeof c !== 'undefined')
			filterCaliber = c;
	};

	this.setMinPrice = function(price) {
		if(typeof price !== 'undefined')
			filterMinPrice = price;
	};

	this.setMaxPrice = function(price) {
		if(typeof price !== 'undefined')
			filterMaxPrice = price;
	};

	this.setUserId = function(owner) {
		if(typeof owner !== 'undefined')
			filterUserId = owner;
	};

	this.setGunType = function(type) {
		if(typeof type !== 'undefined')
			filterType = type;
	};

	this.getQuery = function() {
		var query = {};
		if(filterMinPrice)
		{
			query['price'] = query['price'] || {};
			query['price']['$gte'] = filterMinPrice;
		}
		if(filterMaxPrice)
		{
			query['price'] = query['price'] || {};
			query['price']['$lte'] = filterMaxPrice;
		}
		if(filterManufacturer)
		{
			query['manufacturer'] = filterManufacturer;
		}
		if(filterCaliber)
		{
			query['caliber'] = filterCaliber;
		}
		if(searchTerms && searchTerms.length > 0)
		{
			query['title'] = {$in: []};
			// Iterate all search terms
			searchTerms.forEach(function(term) {
				var r = new RegExp('.*' + term + '.*', 'i');
				query['title']['$in'].push(r);
			});
		}
		if(filterUserId)
		{
			query['userId'] = filterUserId;
		}
		if(filterType)
		{
			query['gunType'] = filterType;
		}

		query['isActive'] = true;

		return query;
	};
};
