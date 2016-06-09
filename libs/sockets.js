var connection = require('./mysqldb');
var S = require('string');
module.exports = function(server){
    var io = require('socket.io')(server);
    io.on('connection', function (socket) {
        socket.on('message', function (message, cb) {
            var name = S(message.name).stripTags().s;
            var email = S(message.email).stripTags().s;
            var homepage = S(message.homepage).stripTags().s;
            var text = S(message.text).stripTags().s;
            console.log(text);
            connection.query('INSERT INTO message (name, email, homepage, text) VALUES (?, ?, ?, ?)', [name, email, homepage, text], function(err, result){
                if(err){
                    throw err;
                }
            });
            message = {
                name: name,
                email: email,
                homepage: homepage,
                text: text
            }
            socket.broadcast.emit("chat", message);
            cb(message);
        });
    });

    //io.set('origins', 'localhost:*') // домены c которых могут подсоединятся к сокетам
}
