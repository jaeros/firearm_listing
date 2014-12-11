// -------------------------------------------
// DEPENDENCIES
// -------------------------------------------
var mongoose = require('mongoose');
var model = require('./models/caliber');
var csv = require('fast-csv');
var fs = require('fs');

// -------------------------------------------
// SETUP
// -------------------------------------------
mongoose.connect('mongodb://localhost:27017/firearm_listings');
mongoose.set('debug', false);

var Caliber = model.Caliber;

// -------------------------------------------
// CODE
// -------------------------------------------

var progress = new ProgressWatcher();

console.log("Removing current caliber list...");
Caliber.remove({}, function(err) {
	if(err)
		console.error("Couldn't remove calibers: ", err);
	startLoad();
});

function startLoad() {
	console.log("Loading caliber data from CSV...");

	// Parse CSV file
	csv
	.fromPath("data/calibers.csv")
	.on("data", function(data) {
		addCaliber(data);
	})
	.on("end", function(){
		progress.setEnableComplete();
	    console.log("Finished parsing csv file");
	});
}

function addCaliber(data, onComplete) {
	if(!data)
		return;
	// Add progress item
	progress.addItem();

	// Create and save caliber object
	var c = Caliber({name: data[0]});
	c.save(function(err) {
		if(err)
			console.log('Invalid caliber: ', err);
		progress.finishItem();
	});
}

function ProgressWatcher() {

	var count = 0;
	var enableComplete = false;
	var totalCount = 0;
	var that = this;
	
	this.addItem = function() {
		count++;
		totalCount++;
	};

	this.finishItem = function() {
		count--;
		if(enableComplete && count == 0)
			that.finish();
	};

	this.setEnableComplete = function() {
		if(count == 0)
			that.finish();
		else
			enableComplete = true;
	};

	this.finish = function() {
		console.log("Finished saving. Total calibers: " + totalCount);
		process.exit(0);
	};
}