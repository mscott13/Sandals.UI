"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("http://localhost:9693/hub").build();
connection.on("ReceiveMessage", function (user, message) {
    alert(message);
});

connection.start();