var express = require('express');
var router = express.Router();
var connection = require('../libs/mysqldb');
/* GET home page. */
router.get('/', function(req, res, next) {
  var messages = connection.query('SELECT * FROM message ORDER BY created_at ASC LIMIT 5', function(error, results, field){
      if(error){
        return next(error);
      }
      res.render('index', { title: 'Guest Book', messages: results });
    });

});

module.exports = router;
