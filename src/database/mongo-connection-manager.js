import mongo from "mongodb";

const MongoClient = mongo.MongoClient;
let url;
const MongoConnectionManager = {
    getConnection: () => {
        if (!url) {
            throw new Error("Mongo port and/or db not set!");
        }
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, (err, database) => {
                if (err) {
                    reject(new Error(err.message));
                } else {
                    resolve(database);
                }
            });
        });
    },
    setUrl: (mongoPort, db, mongoUrl) => {
        if (!mongoPort) {
            throw new Error("Mongo port must be provided");
        } else if (!db) {
            throw new Error("db must be set!");
        } else if (!mongoUrl) {
            throw new Error("Mongo url must be set!");
        }
        url = `mongodb://${mongoUrl}:${mongoPort}/${db}`;
    }
};

export default MongoConnectionManager;
