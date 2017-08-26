import HttpStatus from "http-status-codes";

import jwt from "../utilities/jwt";
import UserDao from "../services/database/DAO/user-dao";

const UserRoute = {
    getAll: async (req, res) => {
        try {
            const users = await UserDao.getAll();
            res.send(users);
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
        }
    },
    getBy: async (req, res) => {
        if (Object.keys(req.body).length === 0) {
            res.status(HttpStatus.BAD_REQUEST).send("No keys provided");
        } else {
            const user = await UserDao.getBy(req.body);
            res.send(user);
        }
    },
    create: async (req, res) => {
        const {username, password} = req.body;
        if (!username) {
            res.status(HttpStatus.BAD_REQUEST).send("No username provided");
        } else if (!password) {
            res.status(HttpStatus.BAD_REQUEST).send("No password provided");
        }
        const createdUser = await UserDao.getBy({username});
        if (createdUser) {
            res.status(HttpStatus.FORBIDDEN).send("Username taken");
        } else {
            await UserDao.create({username, password});
            const newUser = await UserDao.getBy({username});
            const token = await jwt.generateToken(newUser.username, newUser.id);
            res.send({...newUser, token});
        }
    },
    signin: async (req, res) => {
        const {username, password} = req.body;
        if (!username) {
            res.status(HttpStatus.BAD_REQUEST).send("No username provided");
        } else if (!password) {
            res.status(HttpStatus.BAD_REQUEST).send("No password provided");
        }
        const user = await UserDao.getBy({username});
        if (!user) {
            res.status(HttpStatus.FORBIDDEN).send("Username taken");
        } else if (password !== user.password) {
            res.status(HttpStatus.FORBIDDEN).send("Invalid password");
        } else {
            const token = await jwt.generateToken(user.username, user.id);
            res.send({token});
        }
    }
};

export default UserRoute;
