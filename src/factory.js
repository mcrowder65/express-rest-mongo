import MongoUtils from "./database/mongo-utils";
import BaseDao from "./database/DAO/base-dao";

const Factory = async (collection, query, obj) => {
    //TODO add authentication checks
    await MongoUtils.createCollectionIfNotExists(collection);
    switch (query) {
        case "getAll": {

            const res = await BaseDao.getAll(collection, obj);
            return res;
        }
        case "getBy": {
            const res = await BaseDao.getBy(collection, obj);
            return res;
        }
        case "create": {
            const _id = await BaseDao.create(collection, obj);
            const newObj = await BaseDao.getBy(collection, {_id});
            return newObj;
        }
        case "updateById": {
            if (!obj._id) {
                return "No id provided";
            } else {
                await BaseDao.updateById(collection, obj);
                const updatedObj = await BaseDao.getBy(collection, obj);
                return updatedObj;
            }
        }
        case "removeById": {
            if (!obj._id) {
                return "No id provided";
            } else {
                await BaseDao.removeById(collection, obj._id);
                break;
            }
        }
        default:
            return `${query} not implemented yet`;
    }


};

export default Factory;
