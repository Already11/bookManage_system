const express = require('express');
const router = express.Router();
const service = require('./service.js');



router.get('/books',service.allBooks);

router.post('/books/book',service.addBook);

router.get('/www/books/book/:id',service.getBookById);

router.put('/www/books/book',service.editBook);

router.delete('/www/books/book/:id',service.deleteBook);


module.exports = router;