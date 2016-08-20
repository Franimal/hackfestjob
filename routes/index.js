var express = require('express');
var router = express.Router();
var trademe = require('../data/trademe-ids');
/* GET home page. */
router.get('/', function(req, res, next) {
  trademe. getLocationIds().then(function(locations){
    var categories = ["accounting", "engineering", "painting"];
    res.render('index', { title: 'Express' , categories: categories});
  });
});

router.get('/cards', function(req, res, next){
  res.render('cards');
});

module.exports = router;
