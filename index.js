const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const pdf = require("pdfkit");
const fs = require("fs");
const cors = require("cors");
const app = express();
const db = require("./config/mongoose");

// Set up middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Set up routes
app.use("/api", require("./routes/orderRoutes"));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
