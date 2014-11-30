var express = require('express');
var router = express.Router();
var model = require('../models/firearm.js');

var Firearm = model.Firearm;

/* GET users listing. */
router.get('/', function(req, res) {
  Firearm.find({}, function(err, docs) {
  	if(err)
  	{
  		res.status(500).send('Could not retrieve list of firearms');
  	}
  	else
  	{
  		res.status(200).send(docs);
  	}
  });
});

module.exports = router;
