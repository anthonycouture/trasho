'use-strict';
/* Import from module */
const imp = require('../import.js');

const domain = imp.domain();
const poubelle = imp.routePoubelle();


module.exports = (app,base_url) => {
  app.use(base_url+"trash",poubelle);
}

module.exports.init = function (port){
  console.log("Server runs on port ",port);
  return 0;
};
