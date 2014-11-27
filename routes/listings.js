var express = require('express');
var router = express.Router();

var tempDate = new Date("October 13, 2014 11:13:00").toString();

// Hard coded data
listings = [
  {
    id: 0,
    userId: 0,
    title: 'My Awesome Mauser!',
    firearmId: 12345,
    customGunSpecs: {},
    description: 'This Post WWII rifle is such a beauty. Take one shot and you\'ll be hooked!',
    price: 450.99,
    photos: [
      {
        url: 'http://placehold.it/200x200',
        description: 'Mauser - M48'
      }
    ],
    pageViews: 12,
    listedOn: tempDate,
    refreshedOn: tempDate,
    Promotion: null,
    isSold: false,
    isActive: true
  },
  {
    id: 1,
    userId: 10,
    title: 'Glock 42',
    firearmId: 9000,
    customGunSpecs: {},
    description: 'The perfect weapon for concealed carry. .380 AUTO really is big enough, trust me.',
    price: 425.00,
    photos: [
    {
      url: 'http://placehold.it/200x200',
      description: 'Glock 42'
    }
    ],
    pageViews: 421,
    listedOn: tempDate,
    refreshedOn: tempDate,
    Promotion: null,
    isSold: false,
    isActive: true
  }
];

/* GET all listings */
router.get('/', function(req, res) {
  res.json(listings);
});

/* GET a listing based on the listing's id */
router.get('/:listingId', function(req, res) {
  listingId = req.params.listingId;

  listings.forEach(function (listing) {
    if(listing.id == listingId)
      res.json(listing);
  });
});

router.post('/:listingId', function(req, res) {
  listings.push(req.body);

  console.log(listings);
});

router.put('/:listingId', function(req, res) {
  newListing = req.body;

  for(var i = 0; i < listings.length; i++) {
    if(listings[i].id == listingId) {
      listings[i] = req.body;
      console.log(listings[i]);
    }
  }
});

module.exports = router;
