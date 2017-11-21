
// app.js

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = 4000;
var cors = require('cors');

// Mongoose connection with mongodb
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://admin:password@ds159845.mlab.com:59845/trace-ecom')
    .then(() => { // if all is ok we will be here
      console.log('Start');
    })
    .catch(err => { // if error we will be here
        console.error('App starting error:', err.stack);
        process.exit(1);
    });

// Required application specific custom router module
var itemRouter = require('./src/routes/itemRouter');

// Use middlewares to set view engine and post json data to the server
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(req, res){
  res.send("app running");
});
app.use('/items', itemRouter);

//route to configurations - install
var configRouter = require('./src/routes/configRouter');
app.use('/config',configRouter);

//getProducts form Shopify
var pluginAdminRouter = require('./src/routes/pluginAdminRouter');
app.use('/pluginAdmin',pluginAdminRouter);

// Start the server
app.listen(port, function(){
  console.log('Server is running on Port: ',port);
});