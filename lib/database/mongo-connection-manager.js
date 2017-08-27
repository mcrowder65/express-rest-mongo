"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongodb = require("mongodb");

var _mongodb2 = _interopRequireDefault(_mongodb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MongoClient = _mongodb2.default.MongoClient;
//TODO set db!!
var url = "mongodb://localhost:27017/services";
var MongoConnectionManager = {
    getConnection: function getConnection() {
        return new Promise(function (resolve, reject) {
            MongoClient.connect(url, function (err, db) {
                if (err) {
                    reject(new Error(err.message));
                } else {
                    resolve(db);
                }
            });
        });
    }
};

exports.default = MongoConnectionManager;