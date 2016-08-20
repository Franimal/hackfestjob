var express = require('express');
var router = express.Router();
var request = require('request-promise-native');
var secret = require('../env');
var apiIds = require('../data/trademe-ids.js');
var jobApi = require('../data/trademe-jobs-api');

/* GET home page. */
router.get('/', function (req, res, next) {
  var category = req.query.category;

  var promise;
  if (category === undefined) {
    promise = jobApi.getAllRegionData();
  } else {
    promise = jobApi.getAllRegionDataByCategory(category);
  }

  promise.then(function(resp){
    apiIds.getJobCatagoryIds()
    .then((catagories) => {
      res.render('index', { title: 'Express' , categories: catagories, regions: resp});
    });
  });
});

router.get('/cards', function(req, res, next){
  res.render('cards');
});

module.exports = router;
