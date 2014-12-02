// -------------------------------------------
// DEPENDENCIES
// -------------------------------------------
var express = require('express');
var model = require('../models/listing');
var router = express.Router();

// -------------------------------------------
// SETUP
// -------------------------------------------
var Listing = model.Listing;

// -------------------------------------------
// ENDPOINTS
// -------------------------------------------

/* Create new listing */
router.post('/', function(req, res) {
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
  var findListings = function(err, docs) {
    if(err)
      res.status(500).send('Couldn\'t retrieve listings');
    else
      res.status(200).send(docs);
  };

  if(req.query.userId) {
    Listing.find({userId: 'abc123'}, findListings);
  }
  else {
    Listing.find({}, findListings);
  }
});

/* GET a listing based on the listing's id */
router.get('/:listingId', function(req, res) {
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

/* UPDATE an existing listing */
router.put('/:listingId', function(req, res) {
	var user = req.body;

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
			var newUser = User(user);
			newUser.save(function(err) {
				if(err)
					res.status(400).send('Invalid listing');
				else
					res.status(200).send(newUser);
			});
		}
		else
		{
			doc.title = listing.title;
			doc.gunTypeId = listing.gunTypeId;
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

module.exports = router;
