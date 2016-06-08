var connection = require('./mysqldb');
module.exports = function(server){
    var io = require('socket.io')(server);
    io.on('connection', function (socket) {
        socket.on('message', function (message, cb) {
           var createdAt = +new Date().getTime();
            console.log(createdAt);
            connection.query('INSERT INTO message (name, email, homepage, text) VALUES (?, ?, ?, ?)', [message.name, message.email, message.homepage, message.text], function(err, result){
                if(err){
                    throw err;
                }
            });
            socket.broadcast.emit("chat", message);
            cb();
        });
    });

    //io.set('origins', 'localhost:*') // домены c которых могут подсоединятся к сокетам
}
