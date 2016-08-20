var express = require('express');
var router = express.Router();
var request = require('request-promise-native');
var secret = require('../env');
var apiIds = require('../data/trademe-ids.js');
var jobApi = require('../data/trademe-jobs-api');

/* GET home page. */
router.get('/', function (req, res, next) {
    jobApi.getAllRegionData().then(function(resp){
      console.log(resp);
      var categories = ["accounting", "engineering", "painting"];
      res.render('index', { title: 'Express' , categories: categories, regions: resp});
    });
});

router.get('/cards', function(req, res, next){
    res.render('cards');
});

module.exports = router;
