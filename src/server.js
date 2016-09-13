var express = require('express');
var config = require('./config');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var path = require('path');

var app = express();

var apiRoutes = require('./app/routes/api')(app, express);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Handling CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

//Logging Middleware
app.use(morgan('dev'));

mongoose.connect(config.database);

app.use(express.static(__dirname + '/public'));

app.use('/api', apiRoutes);

app.get('*', function(req, res){
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(config.port);
console.log('Server listening on port ' + config.port);
