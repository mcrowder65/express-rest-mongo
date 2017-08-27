import MongoConnectionManager from "./mongo-connection-manager";

const MongoUtils = {
    doesCollectionExist: async collection => {
        const db = await MongoConnectionManager.getConnection();
        return new Promise(resolve => {
            db.listCollections({name: collection}).next((err, collectionInfo) => {
                if (collectionInfo) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });

        });
    },
    createCollectionIfNotExists: async collection => {
        const doesExist = await MongoUtils.doesCollectionExist(collection);
        if (doesExist) {
            return false;
        } else {
            const db = await MongoConnectionManager.getConnection();
            return new Promise(resolve => {
                db.createCollection(collection, err => {
                    if (err) {
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                });


            });
        }
    }
};

export default MongoUtils;
