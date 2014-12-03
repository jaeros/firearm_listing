var express = require('express');
var model = require('../models/user');
var User = model.User;
var router = express.Router();
var bcrypt = require('bcryptjs');
var config = require('config');
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function(req, res) {
  User.find({}, function(err, docs) {
  	if(err)
  	{
  		res.status(500).send('Could not retrieve users');
  	}
  	else
  	{
  		res.status(200).send(docs);
  	}
  });
});

/**
 * Creates a new user
 */
router.post('/', function(req, res) {

	// Create user from parameters
	var user = User(req.body);

	// Hash password
	user.password = hashPassword(user.password);

	// Attempt to save user to mongo
	user.save(function(err) {

		if(err)
		{
			res.status(400).send('Invalid user');
		}
		else
		{
			res.status(201)
			   .set('Location', '/users/' + user._id)
			   .send(user);
		}
	});

});

router.get('/:userId', function(req, res) {
	User.find({'_id': req.params.userId}, function(err, docs) {
		if(docs)
		{
			res.status(200).send(docs[0]);
		}
		else
		{
			res.status(404).send('Specified user not found');
		}

	});
});

router.put('/:userId', function(req, res) {
	var user = req.body;

	// We have to update manually because mongoose's update function
	// 	doesn't run validators on update command (cool, huh?)
	User.findOne({'_id': req.params.userId}, function(err, doc) {
		if(err)
		{
			res.status(500).send('Could not update user');
		}
		else if(!doc)
		{
			// Document not found, create a new document
			User(user).save(function(err) {
				if(err)
					res.status(400).send('Invalid user');
				else
					res.status(200).send(user);
			});
		}
		else
		{
			doc.username = req.body.username;
			doc.password = req.body.password;
			doc.name = req.body.name;
			doc.location = req.body.location;
			doc.email = req.body.email;
			doc.phone = req.body.phone;
			doc.accountType = req.body.accountType;
			doc.profileImageUrl = req.body.profileImageUrl;
			doc.isActive = req.body.isActive;
			doc.save(function(err) {
				if(err)
				{
					console.log(err);
					res.status(400).send('User could not be created/updated.');
				}
				else
				{
					res.status(204).send('');
				}
			});
		}
	});
});

router.post('/login', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;

	// Retrieve specified user
	User.findOne({'username': username}, function(err, doc) {
		if(err || !doc)
		{
			console.log("Error: ", err);
			console.log("Doc: ", doc);
			res.status(401).send('Bad username or password');
		}
		else
		{
			var storedHash = doc.password;
			// Compare passwords
			if(bcrypt.compareSync(password, storedHash))
			{
				console.log("Okay, we're here.");
				// Authentication successful, send token to client
				var token = jwt.sign(doc, config.get('secret'), {expiresInMinutes: 3 * 60});
				res.status(200).send({"token": token});
			}
			else
			{
				console.log("Bad password, actually.");
				// Authentication failed
				res.status(401).send('Bad username or password');
			}
		}
	})
	
});

module.exports = router;

function hashPassword(password) {
	var salt = genSalt();
	return bcrypt.hashSync(password, salt);
}

function genSalt() {
	return bcrypt.genSaltSync(10);
}