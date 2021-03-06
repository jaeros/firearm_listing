// Dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('express-jwt');

// Route handlers
var routes = require('./routes/index');
var users = require('./routes/users');
var listings = require('./routes/listings');
var firearms = require('./routes/firearms');
var upload = require('./routes/upload');
var manufacturers = require('./routes/manufacturers');
var calibers = require('./routes/calibers');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Set up mongo connection in mongoose
mongoose.connect('mongodb://localhost:27017/firearm_listings');
mongoose.set('debug', true);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes for each router
app.use('/', routes);
app.use('/users', users);
app.use('/listings/', listings);
app.use('/firearms/', firearms);
app.use('/upload', upload);
app.use('/manufacturers/', manufacturers);
app.use('/calibers/', calibers);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
app.use(function(err, req, res, next){
  console.log("Error: ", err);
  // console.log("Error name: ", err.inner.name);
  if (err.constructor.name === 'UnauthorizedError') {
    if(err.inner.name == "TokenExpiredError")
        res.status(401).send('TokenExpired');
    else
        res.status(401).send('Unauthorized');
  }
  else if(err.status == 404)
  {
    res.status(404).send("Not found");
  }
  else
  {
    res.status(err.status || 500).send("An error occurred. Please try again later.");
  }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
