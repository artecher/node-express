var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var bookRouter = require('./Routes/bookRoutes');


var db = mongoose.connect('mongodb://localhost/bookAPI');

var Book = require('./models/bookModel');
var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/books', bookRouter(Book));

app.get('/', function (req, res) {
  res.send('welcome to my API!');
});

app.listen(port, function () {
  console.log('Gulp is Running on PORT: ' + port);
});
