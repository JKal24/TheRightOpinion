const search = require('./controllers/search')
const inspect = require('./controllers/inspect');

const express = require('express');
const routes = express.Router();

routes.get("/search/:id", search.search);
routes.get("/inspect/:channel", inspect.inspect);

module.exports = routes;