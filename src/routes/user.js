import UserDao from "../services/database/DAO/user-dao";

const user = {
    getUser: async (req, res) => {
        const users = await UserDao.getAll();
        res.send(users);
    }
};

export default user;
