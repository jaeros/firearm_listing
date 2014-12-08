var express = require('express');
var model = require('../models/manufacturer');
var router = express.Router();
var config = require('config');

var Manufacturer = model.Manufacturer;

/* GET all manufacturer names */
router.get('/', function(req, res) {
  Manufacturer.find({}, function(err, docs) {
  	if(err)
  	{
  		res.status(500).send('Could not retrieve manufacturers');
  	}
  	else
  	{
  		res.status(200).send(docs);
  	}
  });
});

module.exports = router;