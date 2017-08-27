import MongoUtils from "./database/mongo-utils";
import BaseDao from "./database/DAO/base-dao";

const Factory = async (collection, query, obj) => {
    await MongoUtils.createCollectionIfNotExists(collection);
    switch (query) {
        case "getBy": {
            const res = await BaseDao.getBy(collection, obj);
            return res;
        }
        case "create": {
            const _id = await BaseDao.create(collection, obj);
            return {_id};
        }
        case "update": {
            if (!obj._id) {
                return "No id provided";
            } else {
                await BaseDao.updateById(collection, obj);
            }
            break;
        }
        default:
            return `${query} not implemented yet`;
    }


};

export default Factory;
