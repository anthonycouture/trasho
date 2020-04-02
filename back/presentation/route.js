'use-strict';
const control = require("../domain/controller.js");


module.exports.init = function (port){
  console.log("Server runs on port ",port);
  return 0;
};

module.exports.tests = () => {
  return control.envoyerTest();
};
