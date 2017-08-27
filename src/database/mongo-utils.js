import MongoConnectionManager from "./mongo-connection-manager";

const MongoUtils = {
    doesCollectionExist: async collection => {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await MongoConnectionManager.getConnection();
                db.listCollections({name: collection}).next((err, collectionInfo) => {
                    if (err) {
                        reject("Couldn't list collections");
                    } else if (collectionInfo) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });

            } catch (error) {
                reject(error);
            }

        });
    },
    createCollectionIfNotExists: async collection => {
        const doesExist = await MongoUtils.doesCollectionExist(collection);
        if (doesExist) {
            return false;
        } else {
            const db = await MongoConnectionManager.getConnection();
            return new Promise((resolve, reject) => {
                db.createCollection(collection, err => {
                    if (err) {
                        reject(false);
                    } else {
                        resolve(true);
                    }
                });


            });
        }
    }
};

export default MongoUtils;
