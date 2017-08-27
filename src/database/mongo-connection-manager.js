import mongo from "mongodb";

const MongoClient = mongo.MongoClient;
//TODO set db!!
let mongoPort;
let db;
const url = `mongodb://localhost:${mongoPort}/${db}`;
const MongoConnectionManager = {
    getConnection: () => {
        if (!mongoPort || !db) {
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
    setUrl: (port, database) => {
        mongoPort = port;
        db = database;
    }
};

export default MongoConnectionManager;
