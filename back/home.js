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
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(cors())

// Configure ejs
app.set('views', './views');
app.set('view engine', 'ejs');

app.listen(PORT, () => {
 mountRoutes.init();
});

mountRoutes(app);
