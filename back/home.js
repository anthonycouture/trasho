'use strict';
/* Import from module */
const express = require("express");
const bodyParser = require("body-parser");

/* Custom import */
const route = require("./presentation/route.js");
const cors = require('cors');

/* Constante server */
const PORT = 4550;
const BASE_URL = "/";
/* Launch the engine*/
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())


app.listen(PORT, () => {
 route.init(PORT);
});

app.get(BASE_URL, (req,res,next) => {
  res.json(200).send(route.tests());
});
