var socket = io.connect('http://localhost:3000');

socket.on("chat", function (data){
    var row = "<tr><td>"+data.name+"</td><td>"+data.email+"</td><td>"+data.homepage+"</td><td>"+data.text+"</td></tr>";
    if($("#chat tbody tr").length>=5){
        var pagination = '<nav><ul class="pagination"><li><a href="?page=1" aria-label="Next"><span aria-hidden="true">&raquo</span></a></li></ul></nav>';
        $("#chat tbody tr:last-child").remove();
        if(!$(".pagination .pagin.nextPage").length){
            $(pagination).insertAfter("#chat");
        }
    }

    $("#chat tbody").prepend(row);
});
$(document).ready(function(){
    $("form.form-horizontal").submit(function(e){
        e.preventDefault();
        var text = $("#enter-message").val();
        var email = $("#enter-email").val();
        var name = $("#enter-name").val();
        var homepage = $("#enter-homepage").val();
        var notValid = false;
        if(!text){
            $("#enter-message").css("background-color", "rgb(234, 110, 110)");
            notValid = true;
        }else{
            text.replace(/(<([^>]+)>)/ig,"");
            $("#enter-message").css("background-color", "rgb(255, 255, 255)");
        }
        var regExp = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        if(!email||!regExp.test(email)){
            $("#enter-email").css("background-color", "rgb(234, 110, 110)");
            notValid = true;
        }else{
            $("#enter-email").css("background-color", "rgb(255, 255, 255)");
        }
        if(!name){
            $("#enter-name").css("background-color", "rgb(234, 110, 110)");
            notValid = true;
        }else{
            $("#enter-name").css("background-color", "rgb(255, 255, 255)");
        }
        if(notValid){
            return false;
        }

        var message = {
            text: text,
            email: email,
            name: name,
            homepage: homepage,
        }
        socket.emit("message", message, function(data){
            var row = "<tr><td>"+data.name+"</td><td>"+data.email+"</td><td>"+data.homepage+"</td><td>"+data.text+"</td></tr>";
            var pagination = '<nav><ul class="pagination"><li><a href="?page=1" aria-label="Next"><span aria-hidden="true">&raquo</span></a></li></ul></nav>';
            if($("#chat tbody tr").length>=5){
                $("#chat tbody tr:last-child").remove();
                if(!$(".pagination .pagin.nextPage").length){
                    $(pagination).insertAfter("#chat");
                }
            }
            $("#chat tbody").prepend(row);
        });

    })
});
