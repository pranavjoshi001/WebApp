const express = require('express');


const booksRoute = express.Router();
const bookController = require('../controllers/bookController.js');
const bookService = require('../services/goodreadsDervice.js');

function routes(nav) {
  const { getByIndex, getById } = bookController(bookService, nav);

  booksRoute.route('/')
    .get(getByIndex);

  booksRoute.route('/:id')
    .get(getById);

  return booksRoute;
}

module.exports = routes;
