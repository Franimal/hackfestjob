var request = require('request-promise-native');
var apiIds = require('./trademe-ids');
var secret = require("../env");
var regions = require("./region-data");
var utils = require("./util");

function getListingCount(regionId, categoryId) {
      var options = {
          method: 'GET',
          url: 'https://api.trademe.co.nz/v1/Search/Jobs.json',
          qs: {category: categoryId, region: regionId, rows: 1},
          headers: {
              authorization: secret
          },
          json: true
      };

      return request(options)
      .then(function(resp){
          return resp.TotalCount;
      });
}

function getListingCountByRegion(regionId) {
      var options = {
          method: 'GET',
          url: 'https://api.trademe.co.nz/v1/Search/Jobs.json',
          qs: {region: regionId, rows: 1},
          headers: {
              authorization: secret
          },
          json: true
      };
      return request(options)
      .then(function(resp){
          return resp.TotalCount;
      });
}

function getAllRegionData(){
   return new Promise(function(resolve, reject){

     apiIds.getLocationIds().then(function(localities){
       var regionData = [];
       var promises = localities.map(function(val){
           return getListingCountByRegion(val.id);
       });

       Promise.all(promises).then(function(resp){
         for(var i = 0; i < resp.length; i++){
           console.log(localities[i].name);
           var population = regions.population[localities[i].name];
           var unemployment = regions.unemployment[localities[i].name];
           var ratio = utils.getRatio(resp[i], unemployment);
           regionData.push({name: localities[i].name,
             id: localities[i].id,
             population: utils.formatNum(population),
             unemployment: utils.formatNum(unemployment),
             _population: utils.formatNum(population),
             _unemployment: utils.formatNum(unemployment),
             jobcount: resp[i],
             jobratio: ratio
           });
         }
         resolve(utils.sortRegions(regionData));
       });
     });
   });
}

function getAllRegionDataByCategory(catagoryId){
   return new Promise(function(resolve, reject){

     apiIds.getLocationIds().then(function(localities){
       var regionData = [];
       var promises = localities.map(function(val){
           return getListingCount(val.id, catagoryId);
       });

       Promise.all(promises).then(function(resp){
         for(var i = 0; i < resp.length; i++){
           var population = regions.population[localities[i].name];
           var unemployment = regions.unemployment[localities[i].name];
           var ratio = utils.getRatio(resp[i], unemployment);
           regionData.push({name: localities[i].name,
             id: localities[i].id,
             population: utils.formatNum(population),
             unemployment: utils.formatNum(unemployment),
             _population: population,
             _unemployment: unemployment,
             jobcount: resp[i],
             jobratio: ratio
           });
         }
         resolve(utils.sortRegions(regionData));
       });
     });
   });
}

module.exports = {
    getListingCount: getListingCount,
    getListingCountByRegion: getListingCountByRegion,
    getAllRegionData: getAllRegionData,
    getAllRegionDataByCategory: getAllRegionDataByCategory
}
