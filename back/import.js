'user strict'

module.exports = {
  fs : () => require("fs"),
  pg : () => require('pg'),
  cors : () => require('cors'),
  express    : () => require("express"),
  bodyParser : () => require("body-parser"),
  router : () => require('express-promise-router'),


  prop : () => require('./utils/propertyReader'),
  cst   : () => require('./utils/constantes'),

  route : () => require('./presentation'),
  routePoubelle : () => require('./presentation/poubelle'),

  db  : () => require('./infrastructure'),
  qry : () => require('./infrastructure/constantRequest'),

  domain : () => require('./domain'),
  poubelle : () => require('./domain/poubelle'),
  utilisateur : () => require('./domain/utilisateur'),
  signalement : () => require('./domain/signalement'),
  jsonable : () => require('./domain/JSONable'),
}
