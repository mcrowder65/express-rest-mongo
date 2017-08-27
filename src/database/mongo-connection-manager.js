import mongo from "mongodb";

const MongoClient = mongo.MongoClient;
//TODO set db!!
const url = "mongodb://localhost:27017/services";
const MongoConnectionManager = {
    getConnection: () => {
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, (err, db) => {
                if (err) {
                    reject(new Error(err.message));
                } else {
                    resolve(db);
                }
            });
        });

    }
};

export default MongoConnectionManager;
