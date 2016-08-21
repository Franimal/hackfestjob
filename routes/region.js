var express = require('express');
var router = express.Router();
var request = require('request-promise-native');
var secret = require('../env');
var apiIds = require('../data/trademe-ids.js');


function requestNumListings(regionId, categoryId) {
  var options = {
    method: 'GET',
    url: 'https://api.trademe.co.nz/v1/Search/Jobs.json',
    qs: {category: categoryId, region: regionId},
    headers: {
      authorization: secret
    },
    json: true
  };

  return request(options).then((data) => {
    return data.TotalCount;
  })
  ;
}

/* GET home page. */
router.get('/:regionId', function (req, res, next) {
  console.log("Hello");
  var regionId = req.params.regionId;
  var category = req.query.category;
  apiIds.getLocationIds().then((locations) => {
    console.log("wow so very");
    console.log(locations);
    var location = locations.find((l) => { return l.id == regionId });
    console.log(location.name);
    console.log("asd");

    requestNumListings(regionId, category).then((data) => {
      console.log(data);
      var regionData = [{
        jobs: 1000,
        unemployed: 2,
        ratio: '1:3',
        population: 10000,
        salary:1000
      }];

      var job = [{
        Location: location.name,
        title: "How to excel in interviews",
        employer: "KiwiBanks",
        description: " This is a job interviw. ASKJSJKDSJ. aThelaskcncl alksdjioqwejl;wm;lme asjdkasd. askdjjksdjkashkqwenmn ",
      }];

      apiIds.getJobCatagoryIds()
        .then((categories) => {
          res.render('region', { title: 'Express', location: location.name, job:job, categories: categories, regions: regionData, category: category, regionId: regionId});
        });
    });

  });

});

module.exports = router;
