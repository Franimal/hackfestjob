var request = require('request-promise-native');

function getLocationIds() {
  return new Promise(function (resolve, reject) {

    request({uri: "https://api.trademe.co.nz/v1/Localities.json", json: true})
    .then(function(resp) {
      var localities = [];
      for (var index in resp) {
        var entry = resp[index];
        if(entry.Name !== 'All'){
              localities.push({name: entry.Name, id: entry.LocalityId});
        }
        break; // remove me later when quota is not a problem
      }
      console.log(localities);
      resolve(localities);
    })
    .catch(function (err) { reject(err); });
  });
}

function getJobCatagoryIds() {
  return new Promise(function (resolve, reject) {

    request({uri: "https://api.trademe.co.nz/v1/Categories/Jobs.json", json: true})
    .then(function(resp) {
      var jobCatagories = [];
      for (var index in resp) {
        var entry = resp[index];
        jobCatagories.push({name: entry.Name, id: entry.Code});
      }
      console.log(jobCatagories);
      resolve(jobCatagories);
    })
    .catch(function (err) { reject(err); });
  });
}

module.exports = {
  getLocationIds: getLocationIds,
  getJobCatagoryIds: getJobCatagoryIds
}
