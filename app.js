var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);


// connect to a database(data entries) that has been made
mongoose.connect('mongodb://hitesh:1234@localhost/signin');
var a = mongoose.connection;
a.on('error', console.error.bind(console, 'connection error:'));
a.once('open', function(){});


// sessions(track the logins)
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore(
  {
    mongooseConnection: a
  })
}));

//  to parse the coming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static(__dirname + '/UI'));

// routes inclusion
var routes = require('./routes/router');
app.use('/', routes);


//  for the case of 404
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});


// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
}); 

app.listen(3000, function () {
  console.log('Server running on port 3000');
});