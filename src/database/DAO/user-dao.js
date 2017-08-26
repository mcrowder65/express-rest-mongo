import bcrypt from "bcrypt";
import constants from "../../constants/index";

import BaseDao from "./base-dao";

const collection = "users";

const UserDao = {
    getAll: async (obj, exclusion) => {
        const users = await BaseDao.getAll(collection, obj, exclusion);
        return users;
    },
    getBy: async (obj, exclusion) => {
        const result = await BaseDao.getBy(collection, obj, exclusion);
        return result;
    },
    create: async (username, password) => {
        const salt = bcrypt.genSaltSync(constants.SALT_ROUNDS);
        const hash = bcrypt.hashSync(password, salt);
        await BaseDao.create(collection, {
            username,
            password: hash
        });
    },
    updateById: async obj => {
        await BaseDao.updateById(collection, obj);
    },
    removeById: async _id => {
        await BaseDao.removeById(collection, _id);
    }
};

export default UserDao;
