import mongo from "mongodb";

const MongoClient = mongo.MongoClient;
//TODO set db!!
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
    setUrl: (mongoPort, db) => {
        url = `mongodb://localhost:${mongoPort}/${db}`;
    }
};

export default MongoConnectionManager;
