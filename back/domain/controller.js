'user strict'
const con = require("../infrastructure/connector.js");

module.exports.envoyerTest = () => {
  return con.getTest().rows;
}
