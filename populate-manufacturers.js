// -------------------------------------------
// DEPENDENCIES
// -------------------------------------------
var mongoose = require('mongoose');
var model = require('./models/manufacturer');
var csv = require('fast-csv');
var fs = require('fs');

// -------------------------------------------
// SETUP
// -------------------------------------------
mongoose.connect('mongodb://localhost:27017/firearm_listings');
mongoose.set('debug', false);

var Manufacturer = model.Manufacturer;

// -------------------------------------------
// CODE
// -------------------------------------------

var progress = new ProgressWatcher();
var manufacturerData = [];

console.log("Removing current manufacturer list...");
Manufacturer.remove({}, function(err) {
	if(err)
		console.error("Couldn't remove manufacturers: ", err);
	startLoad();
});

function startLoad() {
	console.log("Loading manufacturer data from CSV...");

	// Parse CSV file
	csv
	.fromPath("data/manufacturers.csv")
	.on("data", function(data) {
		addManufacturer(data);
	})
	.on("end", function(){
		progress.setEnableComplete();
	    console.log("Finished parsing csv file");
	});
}

function addManufacturer(data, onComplete) {
	if(!data)
		return;
	// Add progress item
	progress.addItem();

	// Create and save manufacturer object
	var m = Manufacturer({name: data[0], country: data[1]});
	m.save(function(err) {
		if(err)
			console.log('Invalid manufacturer: ', m);
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
		console.log("Finished saving. Total manufacturers: " + totalCount);
		process.exit(0);
	};
}