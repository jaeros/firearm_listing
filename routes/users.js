var express = require('express');
var model = require('../models/user');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('users resource');
});

module.exports = router;
