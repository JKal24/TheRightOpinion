require('dotenv').config();
const express = require("express");
const compression = require("compression");
const cors = require('cors');
const logger = require("morgan");
const routes = require("./routes");

// Set up the express app
const app = express();

// Use cross origin resource sharing
app.use(cors());

// Log requests to the console.
app.use(logger("dev"));

// Will attempt to compress responses.
app.use(compression());

// Parse incoming requests data.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server started on port ${process.env.PORT}.`);
});
