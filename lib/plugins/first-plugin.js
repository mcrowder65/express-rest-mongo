"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var temp = exports.temp = {
    method: "GET",
    path: "/temp",
    handler: function handler(req, reply) {
        var payload = req.payload;

        console.log(payload);
        reply({ message: "hello!" });
    }
};