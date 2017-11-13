import bcrypt from "bcrypt";
import constants from "../../constants/index";

import BaseDao from "./base-dao";

const collection = "users";

const UserDao = {
    genSalt: () => {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(constants.SALT_ROUNDS, async (err, salt) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(salt);
                }
            });
        });
    },
    genHash: async (password, salt) => {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(hash);
                }
            });

        });
    },
    create: async (username, password) => {
        const salt = await UserDao.genSalt();
        const hash = await UserDao.genHash(password, salt);
        return BaseDao.create(collection, {
            username,
            password: hash
        });

    }
};

export default UserDao;
