var request = require('request-promise-native');
var apiIds = require('./trademe-ids');
var secret = require("../env");

function getListingCount(regionId, categoryId) {
      var options = {
          method: 'GET',
          url: 'https://api.trademe.co.nz/v1/Search/Jobs.json',
          qs: {category: categoryId, region: regionId},
          headers: {
              authorization: secret
          },
          json: true
      };

      return request(options)
      .then(function(resp){
          return resp.TotalCount;
      })
      .catch(function (err) { reject(err); });
}

function getListingCountByRegion(regionId) {
      var options = {
          method: 'GET',
          url: 'https://api.trademe.co.nz/v1/Search/Jobs.json',
          qs: {region: regionId},
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
            regionData.push({name: localities[i].name, id: localities[i].id, jobcount: resp[i], jobratio: -500});
         }
         resolve(regionData);
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
            regionData.push({name: localities[i].name, id: localities[i].id, jobcount: resp[i], jobratio: -500});
         }
         resolve(regionData);
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
