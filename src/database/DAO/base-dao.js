import MongoConnectionManager from "../mongo-connection-manager";

const ObjectId = require("mongodb").ObjectId;

const BaseDao = {
    getAll: async (collection, obj, exclusion) => {
        const db = await MongoConnectionManager.getConnection();
        obj = obj._id ? {
            ...obj,
            _id: new ObjectId(obj._id)
        } : obj;
        return new Promise((resolve, reject) => {
            db.collection(collection).find((obj || {}),
                (exclusion || {})).toArray((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
                db.close();
            });
        });
    },
    getBy: async (collection, obj) => {
        const db = await MongoConnectionManager.getConnection();
        obj = obj._id ? {
            ...obj,
            _id: new ObjectId(obj._id)
        } : obj;
        return new Promise((resolve, reject) => {
            db.collection(collection).findOne(obj, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                    db.close();
                }
            );
        });
    },
    create: async (collection, obj) => {
        const db = await MongoConnectionManager.getConnection();
        return new Promise((resolve, reject) => {
            db.collection(collection).insertOne(obj, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
                db.close();
            });
        });
    },
    updateById: async (collection, obj) => {
        const storedObj = await BaseDao.getBy(collection, {_id: obj._id});
        await BaseDao.removeById(collection, obj._id);
        const o = {
            ...storedObj,
            ...obj,
            _id: storedObj._id
        };
        delete o.token;
        await BaseDao.create(collection, o);
    },
    removeById: async (collection, _id) => {
        _id = new ObjectId(_id);
        const db = await MongoConnectionManager.getConnection();
        return new Promise((resolve, reject) => {
            db.collection(collection).removeOne({_id}, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
                db.close();
            });
        });
    }
};

export default BaseDao;
