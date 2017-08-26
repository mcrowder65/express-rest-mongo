import mongo from "mongodb";

const MongoClient = mongo.MongoClient;
const url = "mongodb://localhost:27017/services";
const MongoConnectionManager = {
    getConnection: async () => {
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, (err, db) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(db);
                }
            });
        });
    }
};

export default MongoConnectionManager;
