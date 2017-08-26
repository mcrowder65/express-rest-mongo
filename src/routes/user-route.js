import HttpStatus from "http-status-codes";
import bcrypt from "bcrypt";

import jwt from "../utilities/jwt";
import UserDao from "../database/DAO/user-dao";

const UserRoute = {
    getAll: async (req, res) => {
        try {
            const users = await UserDao.getAll({}, {password: false});
            res.send(users);
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
        }
    },
    getBy: async (req, res) => {
        try {
            if (Object.keys(req.body).length === 0) {
                res.status(HttpStatus.BAD_REQUEST).send("No keys provided");
            } else {
                const user = await UserDao.getBy(req.body, {password: false});
                res.send(user);
            }
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
        }
    },
    signup: async (req, res) => {
        try {
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
                await UserDao.create(username, password);
                const newUser = await UserDao.getBy({username});
                const token = await jwt.generateToken(newUser.username, newUser.id);
                res.send({...newUser, password: undefined, token});
            }
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
        }
    },
    signin: async (req, res) => {
        try {

            const {username, password} = req.body;
            if (!username) {
                res.status(HttpStatus.BAD_REQUEST).send("No username provided");
            } else if (!password) {
                res.status(HttpStatus.BAD_REQUEST).send("No password provided");
            }
            const user = await UserDao.getBy({username});
            if (!user) {
                res.status(HttpStatus.FORBIDDEN).send("Username doesn\'t exist");
            }
            bcrypt.compare(password, user.password).then(async result => {
                if (result) {
                    const token = await jwt.generateToken(user.username, user._id);
                    res.send({...user, password: undefined, token});
                } else {
                    res.status(HttpStatus.FORBIDDEN).send("Invalid password");
                }
            });

        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
        }
    },
    updateById: async (req, res) => {
        try {
            const {token, _id} = req.body;
            const decoded = await jwt.verifyToken(token);
            if (decoded._id !== _id) {
                res.status(HttpStatus.FORBIDDEN).send("You can\'t updateById someone else");
            } else {
                await UserDao.updateById(req.body);
                res.send("success");
            }
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
        }
    },
    removeById: async (req, res) => {
        try {
            const {_id} = req.body;
            await UserDao.removeById(_id);
            res.send("success");
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
        }
    }
};

export default UserRoute;
