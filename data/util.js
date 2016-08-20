var gcd = require('gcd');

function getRatio(a, b) {
  var g = gcd(a,b);
  return `${a / g}:${b / g}`;
}

module.exports = {
  getRatio: getRatio
}
