var express = require('express');

var routes = function(Book) {

  var bookRouter = express.Router();

  bookRouter.route('/')
    .post(function(req, res){
      var book = new Book(req.body);
      book.save();
      res.status(201).send(book);
    })
    .get(function(req, res){

      var query = {};

      if(req.query.genre){
        query = req.query;
        Book.find(query, function(err, books){
          if (err) {
            res.status(500).send(err);
          } else {
            res.json(books);
          }
        });
      }else {
        Book.find(function (err, books) {
          res.json(books);
        })
      }
    });

  bookRouter.use('/:bookId', function (req, res, next) {
    Book.findById(req.params.bookId, function(err, book){
      if(err) {
        res.status(500).send(err);
      }else if(book){
        req.book = book;
        next();
      }else {
        res.status(404);
      }
    })
  });
  bookRouter.route('/:bookId')
    .get(function(req, res){
      res.json(req.book);
    })
    .put(function (req, res) {
      req.book.title = req.body.title;
      req.book.author = req.body.author;
      req.book.genre = req.body.genre;
      req.book.read = req.body.read;
      req.book.save();
      res.json(req.book);
    })
    .patch(function (req, res) {
      req.book.title = req.body.title || req.book.title;
      req.book.author = req.body.author || req.book.author;
      req.book.genre = req.body.genre || req.book.genre;
      req.book.read = req.body.read || req.book.read;
      req.book.save();
      res.json(req.book);
    })
    .delete(function (req, res) {
      req.book.remove(function (err) {
        if (err){
          res.status(500).send(err);
        } else {
          res.status(204).send('Removed');
        }
      });
    })

  return bookRouter;
};

module.exports = routes;
