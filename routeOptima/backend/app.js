const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const userRoute = require('./routes/user');
const controlRoute = require('./routes/control');
const shopRoute = require('./routes/shopManager');

const axios = require("axios");



app.use(cors({
    origin: '*'
}));
app.use(bodyParser.json());
app.use("/user", userRoute);
app.use("/control", controlRoute);
app.use("/shop", shopRoute);

module.exports = app;
