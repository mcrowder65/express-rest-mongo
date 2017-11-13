import MongoUtils from "./database/mongo-utils";
import BaseDao from "./database/DAO/base-dao";
import DbActionTypes from "./constants/db-action-types";
//eslint-disable-next-line
const Factory = async (collection, query, obj) => {
    //TODO add authentication checks
    await MongoUtils.createCollectionIfNotExists(collection);
    switch (query) {
        case DbActionTypes.GET_ALL: {
            return BaseDao.getAll(collection, obj);
        }
        case DbActionTypes.GET_BY: {
            return BaseDao.getBy(collection, obj);
        }
        case DbActionTypes.CREATE: {
            const _id = await BaseDao.create(collection, obj);
            return BaseDao.getBy(collection, {_id});
        }
        case DbActionTypes.REMOVE_BY_ID: {
            if (!obj._id) {
                return "No id provided";
            } else {
                await BaseDao.removeById(collection, obj._id);
                return {
                    message: "deleted!"
                };
            }
        }
        case DbActionTypes.UPDATE_BY_ID: {
            if (!obj._id) {
                return "No id provided";
            } else {
                await BaseDao.updateById(collection, obj);
                return BaseDao.getBy(collection, {_id: obj._id});
            }
        }

        default:
            return `${query} not implemented yet`;
    }
};

export default Factory;
