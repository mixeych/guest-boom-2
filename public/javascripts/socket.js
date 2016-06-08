var socket = io.connect('http://localhost:3000');

socket.on("chat", function (data){
    var row = "<tr><td>"+data.name+"</td><td>"+data.email+"</td><td>"+data.homepage+"</td><td>"+data.text+"</td></tr>";
    $("#chat tbody").prepend(row);
});
$(document).ready(function(){
    $("form.form-horizontal").submit(function(e){
        e.preventDefault();
        var message = {
            text: $("#enter-message").val(),
            email: $("#enter-email").val(),
            name: $("#enter-name").val(),
            homepage: $("#enter-homepage").val(),
        }
        socket.emit("message", message, function(data){
            var row = "<tr><td>"+message.name+"</td><td>"+message.email+"</td><td>"+message.homepage+"</td><td>"+message.text+"</td></tr>";
            $("#chat tbody").prepend(row);
        });

    })
});
