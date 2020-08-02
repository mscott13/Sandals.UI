"use strict";
/// <reference path="site.js" />

$(document).ready(function () {
    var connection = new signalR.HubConnectionBuilder().withUrl("http://localhost:9693/hub").withAutomaticReconnect().build();

    connection.on("ReceiveMessage", function (message) {
        SetSystemMessage(message, "neutral");
    });
    connection.start();
})