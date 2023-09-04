const socket = io("http://localhost:8888");

socket.on("server-submit-failed", () => {
    alert(">>>User existed");
});

socket.on("server-send-online-users", (data) => {
    $("#leftContent").html('');
    for (const user of data) {
        if (user.id != socket.id) {
            // alert(socket.username);
            $("#leftContent").append(
                "<div class='user'>" + user.username + "</div>"
            );
        }
    }
});

socket.on("server-submit-success", (username) => {
    $("#login").hide(2000);
    $("#chatbox").show(1000);
    $("#you").html(username);
    alert(">>>Submit successfully");
});

socket.on("send-back-message", (message) => {
    $("#messages").append("<div class='your-message'>" + message + "</div>");
});

socket.on("new-message", (message) => {
    $("#messages").append("<div class='other-message'>" + message + "</div>");
});

$(document).ready(() => {
    $("#login").show();
    $("#chatbox").hide();

    $("#submit").click(() => {
        socket.emit("client-submit-username", {
            username: $("#text-username").val(),
            id: socket.id,
        });
        $("#text-username").val('');
    });

    $("#logout").click(() => {
        socket.emit("logout");
        $("#login").show(2000);
        $("#chatbox").hide(1000);
    });

    $("#btnSend").click(() => {
        const message = $("#message").val();
        if (message) {
            socket.emit("send-message", message);
            $("#message").val('');
        }
    });
});
