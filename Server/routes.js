const search = require('./controllers/search')

const express = require('express');
const routes = express.Router();

routes.get("/search/:id", search.search);
routes.get("/dislike/:isDisliked/:videoID", search.dislike);

module.exports = routes;