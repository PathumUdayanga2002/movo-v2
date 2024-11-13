const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 5000;

// use cors
app.use(cors());
//use  body parser
app.use(bodyParser.json());

// app load the port
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
