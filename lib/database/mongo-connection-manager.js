"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongodb = require("mongodb");

var _mongodb2 = _interopRequireDefault(_mongodb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MongoClient = _mongodb2.default.MongoClient;
//TODO set db!!
var mongoPort = void 0;
var db = void 0;
var url = "mongodb://localhost:" + mongoPort + "/" + db;
var MongoConnectionManager = {
    getConnection: function getConnection() {
        if (!mongoPort || !db) {
            throw new Error("Mongo port and/or db not set!");
        }
        return new Promise(function (resolve, reject) {
            MongoClient.connect(url, function (err, database) {
                if (err) {
                    reject(new Error(err.message));
                } else {
                    resolve(database);
                }
            });
        });
    },
    setUrl: function setUrl(port, database) {
        mongoPort = port;
        db = database;
    }
};

exports.default = MongoConnectionManager;