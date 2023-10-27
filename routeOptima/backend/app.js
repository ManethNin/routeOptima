const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const userRoute = require('./routes/user');
const controlRoute = require('./routes/control');

const axios = require("axios");



app.use(cors());
app.use(bodyParser.json());
app.use("/user", userRoute);
app.use("/control", controlRoute);


module.exports = app;
