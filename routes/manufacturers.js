var express = require('express');
var model = require('../models/manufacturer');
var router = express.Router();
var config = require('config');

var Manufacturer = model.Manufacturer;

/* GET all manufacturer names and id's */
router.get('/', function(req, res) {
  	Manufacturer.aggregate([
  		{$project: {'name': 1}}
  	], function(err, result) {
  		if(err)
		{
			res.status(500).send('Could not retrieve manufacturers');
		}
		else
		{
			res.status(200).send(result);
		}
  	});
});

router.get('/:manufacturerId', function(req, res) {
	Manufacturer.find({'_id': req.params.manufacturerId}, function(err, doc) {
		if(err)
		{
			res.status(500).send('Could not retrieve manufacturer');
		}
		else if(!doc)
		{
			res.status(404).send('Not found');
		}
		else
		{
			res.status(200).send(doc);
		}

	});
});

module.exports = router;