var express = require('express');
var router = express.Router();
var request = require('request-promise-native');
var secret = require('../env');
var apiIds = require('../data/trademe-ids.js');

function requestNumListings(regionId, categoryId){
  var options = { method: 'GET',
    url: 'https://api.trademe.co.nz/v1/Search/Jobs.json',
    qs: { category: categoryId, region: regionId },
    headers:
     {
       authorization: secret
     },
     json: true
    };

  return request(options).then(data => {
    return data.TotalCount;
  });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  requestNumListings(100, 5001).then(data => {
    console.log(data);
    regionData = [{name:'Auckland', id:1, jobcount:500, jobratio:'1:4'}, {name:'Wellington', id:2, jobcount:90000, jobratio:'1:4'}];
  });
  res.render('index', { title: 'Express', regions: regionData});
});

module.exports = router;
