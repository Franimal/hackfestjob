var request = require('request-promise-native');
var apiIds = require('./trademe-ids');

function getListingCount(regionId, categoryId) {

    return new Promise(function(resolve, reject){
      var options = {
          method: 'GET',
          url: 'https://api.trademe.co.nz/v1/Search/Jobs.json',
          qs: {category: categoryId, region: regionId},
          headers: {
              authorization: secret
          },
          json: true
      };

      request(options)
      .then(function(resp){
          resolve(resp.TotalCount);
      })
      .catch(function (err) { reject(err); });
    });
}

function getListingCountByRegion(regionId) {

    return new Promise(function(resolve, reject){
      var options = {
          method: 'GET',
          url: 'https://api.trademe.co.nz/v1/Search/Jobs.json',
          qs: {region: regionId},
          headers: {
              authorization: secret
          },
          json: true
      };

      request(options)
      .then(function(resp){
          resolve(resp.TotalCount);
      })
      .catch(function (err) { reject(err); });
    });
}

function getAllRegionData(){
      var localities = apiIds.getLocationIds();
      var regionData = [];
      var promises = [];
      for(var i = 0; i < localities.length; i++){
        var count = getListingCountByRegion(localities[i].id).then(function(resp){
            regionData[i] = {name: localities[i].name, id: localities[i].id, jobcount: data, jobratio: -500};
        });
      }
      return regionData;
}

module.exports = {
    getListingCountByRegion: getListingCountByRegion,
    getAllRegionData: getAllRegionData
}
