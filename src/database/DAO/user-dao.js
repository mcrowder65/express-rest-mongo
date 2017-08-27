import bcrypt from "bcrypt";
import constants from "../../constants/index";

import BaseDao from "./base-dao";

const collection = "users";

const UserDao = {
    create: async (username, password) => {
        const salt = bcrypt.genSaltSync(constants.SALT_ROUNDS);
        const hash = bcrypt.hashSync(password, salt);
        await BaseDao.create(collection, {
            username,
            password: hash
        });
    }
};

export default UserDao;
