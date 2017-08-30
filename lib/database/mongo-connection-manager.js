"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongodb = require("mongodb");

var _mongodb2 = _interopRequireDefault(_mongodb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MongoClient = _mongodb2.default.MongoClient;
var url = void 0;
var MongoConnectionManager = {
    getConnection: function getConnection() {
        if (!url) {
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
    setUrl: function setUrl(mongoPort, db, mongoUrl) {
        if (!mongoPort) {
            throw new Error("Mongo port must be provided");
        } else if (!db) {
            throw new Error("db must be set!");
        } else if (!mongoUrl) {
            throw new Error("Mongo url must be set!");
        }
        url = "mongodb://" + mongoUrl + ":" + mongoPort + "/" + db;
    }
};

exports.default = MongoConnectionManager;