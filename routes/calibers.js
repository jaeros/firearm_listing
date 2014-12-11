var express = require('express');
var model = require('../models/caliber');
var router = express.Router();
var config = require('config');

var Caliber = model.Caliber;

/* GET all manufacturer names and id's */
router.get('/', function(req, res) {
  	Caliber.aggregate([
  		{$project: {'name': 1}}, {$sort: {'name': 1}}
  	], function(err, result) {
  		if(err)
		{
			res.status(500).send('Could not retrieve calibers');
		}
		else
		{
			res.status(200).send(result);
		}
  	});
});

router.get('/:caliberId', function(req, res) {
	Caliber.find({'_id': req.params.caliberId}, function(err, doc) {
		if(err)
		{
			res.status(500).send('Could not retrieve caliber');
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