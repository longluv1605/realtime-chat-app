require("dotenv").config();
const express = require("express");
const config = require("./config/config");
const initWebRoutes = require("./routes/web");

// Create server
const app = express();
const host = process.env.HOST || "localhost";
const port = process.env.PORT || 8888;
const server = require("http").Server(app);
const io = require("socket.io")(server);

// Config
config(app);
const listUsers = [];

// Init web routes
initWebRoutes(app);

// Socket IO
io.on("connection", (socket) => {
    console.log(socket.id + " connected");

    // Listen
    socket.on("client-submit-username", (newUser) => {
        const user = listUsers.find(
            (user) => user.username === newUser.username
        );
        if (user) {
            // Submit failed
            socket.emit("server-submit-failed");
        } else {
            // Submit success
            listUsers.push(newUser);
            socket.username = newUser.username;
            socket.emit("server-submit-success", newUser.username);
            io.sockets.emit("server-send-online-users", listUsers);
        }
    });

    socket.on("logout", () => {
        const index = listUsers.indexOf((user) => user.id === socket.id);
        listUsers.splice(index, 1);
        socket.username = undefined;
        io.sockets.emit("server-send-online-users", listUsers);
    });

    socket.on("send-message", (message) => {
        socket.emit("send-back-message", message);
        socket.broadcast.emit("new-message", socket.username + ": " + message);
    });
});

// Deploy
server.listen(port, host, () => {
    console.log(`Server http://${host}:${port}`);
});
