var gcd = require('gcd');

function getRatio(a, b) {
  var right = Math.round(b/a);
  //var g = gcd(a,b);
  if(a == 0){
    return '-';
  }
  return `1:${right}`;
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

// http://stackoverflow.com/questions/9345136/1000000-to-1m-and-1000-to-1k-and-so-on-in-js
function formatNum(n) {
  return m(n, 0);
}
function m(n,d){x=(''+n).length,p=Math.pow,d=p(10,d)
x-=x%3
return Math.round(n*d/p(10,x))/d+" kMGTPE"[x/3]}

module.exports = {
  getRatio: getRatio,
  round: round,
  formatNum: formatNum,
  sortRegions: sortRegions
}
