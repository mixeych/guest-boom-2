var express = require('express');
var router = express.Router();
var connection = require('../libs/mysqldb');
var url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
  var messages = connection.query('SELECT * FROM message ORDER BY created_at DESC LIMIT 5', function(error, results, field){
      if(error){
        return next(error);
      }
      // results.paginate({}, { page: req.query.page, limit: req.query.limit }, function(err, messages, pageCount, itemCount) {
      //
      //     if (err) return next(err);
      //
      //     res.format({
      //         html: function() {
      //             res.render('users', {
      //                 users: messages,
      //                 pageCount: pageCount,
      //                 itemCount: itemCount,
      //                 pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
      //             });
      //         },
      //         json: function() {
      //             // inspired by Stripe's API response for list objects
      //             res.json({
      //                 object: 'list',
      //                 has_more: paginate.hasNextPages(req)(pageCount),
      //                 data: messages
      //             });
      //         }
      //     });
      //
      // });
      res.render('index', { title: 'Guest Book', messages: results });
    });

});

module.exports = router;
