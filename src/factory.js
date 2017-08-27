import MongoUtils from "./database/mongo-utils";
import BaseDao from "./database/DAO/base-dao";

const Factory = (collection, query, obj) => {
    return new Promise(async resolve => {
        await MongoUtils.createCollectionIfNotExists(collection);
        switch (query) {
            case "getBy": {
                const res = await BaseDao.getBy(collection, obj);
                resolve(res);
                break;
            }
            case "create": {
                await BaseDao.create(collection, obj);
                resolve();
                break;
            }
            default:
                resolve();
                break;
        }
    });

};

export default Factory;
