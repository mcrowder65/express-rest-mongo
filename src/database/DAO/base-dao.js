import MongoConnectionManager from "../mongo-connection-manager";

const ObjectId = require("mongodb").ObjectId;
//TODO is there a way to abstract the collection checks?
const BaseDao = {
    getAll: async (collection, obj, exclusion) => {
        if (typeof collection !== "string") {
            throw new Error("Collection either not provided or is not a string");
        }
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
        if (typeof collection !== "string") {
            throw new Error("Collection either not provided or is not a string");
        }
        const db = await MongoConnectionManager.getConnection();
        obj = obj._id ? {
            ...obj,
            _id: new ObjectId(obj._id)
        } : obj;
        return new Promise(async (resolve, reject) => {
            db.collection(collection).findOne(obj, (err, result) => {
                    if (err) {
                        reject("Couldn't findOne");
                    } else {
                        resolve(result || {});
                    }
                    db.close();
                }
            );


        });

    },
    create: async (collection, obj) => {
        if (typeof collection !== "string") {
            throw new Error("Collection either not provided or is not a string");
        }
        const db = await MongoConnectionManager.getConnection();
        return new Promise(async (resolve, reject) => {
            db.collection(collection).insertOne(obj, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res.insertedId);
                }
                db.close();
            });
        });
    },
    updateById: async (collection, obj) => {
        if (typeof collection !== "string") {
            throw new Error("Collection either not provided or is not a string");
        }
        const storedObj = await BaseDao.getBy(collection, {_id: obj._id});
        await BaseDao.removeById(collection, obj._id);
        const o = {
            ...storedObj,
            ...obj,
            _id: storedObj._id
        };
        delete o.token;
        await BaseDao.create(collection, o);
        return BaseDao.getBy(collection, o._id);
    },
    removeById: async (collection, _id) => {
        if (typeof collection !== "string") {
            throw new Error("Collection either not provided or is not a string");
        }
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
