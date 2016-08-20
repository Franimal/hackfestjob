var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  
  res.render('index', { title: 'Express' });
});

router.get('/cards', function(req, res, next){
  res.render('cards');
});

module.exports = router;
