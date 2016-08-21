var gcd = require('gcd');

function getRatio(a, b) {
  var g = gcd(a,b);
  return `${a / g}:${b / g}`;
}

function round(a){
  var val = 1;
  if(a > 10){
    val = 10;
  }
  if(a > 100){
    val = 100;
  }
  if(a > 1000){
    val = 1000;
  }
  return Math.round(a / val) * val;
}

function sortRegions(regions) {
  return regions.sort((a, b) => {
    return (b.jobcount /  b.unemployment)  - (a.jobcount /  a.unemployment);
  });
}

module.exports = {
  getRatio: getRatio,
  round: round,
  sortRegions: sortRegions
}
