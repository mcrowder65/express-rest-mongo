var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/services";

MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    db.createCollection("users", function (err, res) {
        if (err) throw err;
        console.log("Collection created!");
    });
    db.createCollection("companies", function (err, res) {
        if (err) throw err;
        console.log("Collection created!");
    });
});