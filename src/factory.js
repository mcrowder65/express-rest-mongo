import MongoUtils from "./database/mongo-utils";
import BaseDao from "./database/DAO/base-dao";
import DbActionTypes from "../constants/db-action-types";
/*eslint max-statements: "off"*/
const Factory = async (collection, query, obj) => {
    //TODO add authentication checks
    await MongoUtils.createCollectionIfNotExists(collection);
    switch (query) {
        case DbActionTypes.GET_ALL: {

            const res = await BaseDao.getAll(collection, obj);
            return res;
        }
        case DbActionTypes.GET_BY: {
            const res = await BaseDao.getBy(collection, obj);
            return res;
        }
        case DbActionTypes.CREATE: {
            const _id = await BaseDao.create(collection, obj);
            const newObj = await BaseDao.getBy(collection, {_id});
            return newObj;
        }
        case DbActionTypes.UPDATE_BY_ID: {
            if (!obj._id) {
                return "No id provided";
            } else {
                await BaseDao.updateById(collection, obj);
                const updatedObj = await BaseDao.getBy(collection, {_id: obj._id});
                return updatedObj;
            }
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
        default:
            return `${query} not implemented yet`;
    }


};

export default Factory;
