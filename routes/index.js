var express = require('express');
var router = express.Router();
var connection = require('../libs/mysqldb');
var url = require('url');
var limit = 5;
var S = require('string');
function pagination(page, rows, orderby, order){
    rows = parseInt(rows);
    var pagin = {};
    var lastPage = Math.floor(rows / limit);
    console.log(lastPage);
    var offset;
    switch(page){
        case '0':
            pagin.prevPage = false;
            pagin.nextPage = '?page=1';
            pagin.sql = 'SELECT * FROM message ORDER BY '+orderby+' '+order+' LIMIT '+limit;
            break;
        case '1':
            pagin.prevPage = '/';
            pagin.nextPage = '?page=2';
            offset = +page*limit;
            pagin.sql = 'SELECT * FROM message ORDER BY '+orderby+' '+order+' LIMIT '+limit+' OFFSET '+offset;
            break;
        default:
            pagin.prevPage = +page-1;
            pagin.prevPage = '?page='+pagin.prevPage;
            pagin.nextPage = +page+1;
            pagin.nextPage = '?page='+pagin.nextPage;
            offset = +page*limit;
            pagin.sql = 'SELECT * FROM message ORDER BY '+orderby+' '+order+' LIMIT '+limit+' OFFSET '+offset;
    }
    page = parseInt(page);
    if(rows<=limit||page>=lastPage){
        pagin.nextPage = false;
    }
    return pagin;
}


/* GET home page. */
router.get('/', function(req, res, next) {

    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    connection.query('SELECT count(*) as numRows FROM message', function(error, results, field){
        if(error){
            return next(error);
        }
        rows = +results[0].numRows;
        var page;
        var sql;
        if(!query.page){
            page = '0';
        }else{
            page = S(query.page).stripTags().s;
        }
        var orderby = 'created_at';
        if(query.sort){
            orderby = S(query.sort).stripTags().s;
        }
        var order = 'DESC';
        if(query.order){
            order = S(query.order).stripTags().s;
        }
        pagin = pagination(page, rows, orderby, order);
        sql = pagin.sql;
        if(order == 'DESC'){
            pagin.order = 'ASC';
        }else{
            pagin.order = 'DESC';
        }
        connection.query(sql, function(error, results, field){
            if(error){
                return next(error);
            }
            res.render('index', { title: 'Guest Book', messages: results, pagin:pagin });
        });
    });
});

module.exports = router;
