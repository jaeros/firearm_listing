var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.json([{message: 'listings resources'}]);
});

router.get('/:listingId', function(req, res) {
  res.json({id: 0, message: 'listing resource'});
});

module.exports = router;
