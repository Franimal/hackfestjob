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
router.get('/', function (req, res, next) {
    console.log("Hello");
    requestNumListings(100, 5001).then((data) => {
        console.log(data);
        var regionData = [{
            jobs: 1000,
            unemployed: 2,
            ratio: '1:3',
            population: 10000,
            salary:1000
        }];
        var categories = ["accounting", "engineering", "painting"];
        res.render('region', { title: 'Express' , categories: categories, regions: regionData});

    });

});

module.exports = router;
