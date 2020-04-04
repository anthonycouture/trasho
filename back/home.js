'use strict';
/* Import from module */
const imp = require('./import.js');

const express = imp.express();
const bodyParser = imp.bodyParser();
const cors = imp.cors();
const property = imp.prop();
const mountRoutes = imp.route();

/* Constante server */
const PORT = property.server_port;
const BASE_URL = property.url_base;
/* Launch the engine*/
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())


app.listen(PORT, () => {
 mountRoutes.init(PORT);
});

mountRoutes(app,BASE_URL);
