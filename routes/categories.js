var express = require('express');
var router = express.Router();
var trademe = require('../data/trademe-ids');
/* GET home page. */
router.get('/', function(req, res, next) {

});

router.get('/cards', function(req, res, next){
  res.render('cards');
});

module.exports = router;
