import HttpStatus from "http-status-codes";
import bcrypt from "bcrypt";

import constants from "../constants/index";
import jwt from "../utilities/jwt";
import UserDao from "../database/DAO/user-dao";
import BaseDao from "../database/DAO/base-dao";

const UserRoute = {
    signup: async (req, res) => {
        try {
            const {username, password} = req.body;
            if (!username) {
                res.status(HttpStatus.BAD_REQUEST).send("No username provided");
            } else if (!password) {
                res.status(HttpStatus.BAD_REQUEST).send("No password provided");
            } else {
                const createdUser = await BaseDao.getBy("users", {username});
                if (createdUser && createdUser._id) {
                    res.status(HttpStatus.FORBIDDEN).send("Username taken");
                } else {
                    await UserDao.create(username, password);
                    const newUser = await BaseDao.getBy("users", {username});
                    const token = await jwt.generateToken(newUser.username, newUser.id);
                    res.send({...newUser, password: undefined, token});
                }
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
            const user = await BaseDao.getBy("users", {username});
            if (!user || !user._id) {
                res.status(HttpStatus.FORBIDDEN).send("Username doesn\'t exist");
            } else {

                bcrypt.compare(password, user.password).then(async result => {
                    if (result) {
                        const token = await jwt.generateToken(user.username, user._id);
                        res.send({...user, password: undefined, token});
                    } else {
                        res.status(HttpStatus.FORBIDDEN).send("Invalid password");
                    }
                });
            }

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
                let obj = req.body;
                if (req.body.password) {
                    const salt = bcrypt.genSaltSync(constants.SALT_ROUNDS);
                    const hash = bcrypt.hashSync(req.body.password, salt);
                    obj = {
                        ...obj,
                        password: hash
                    };
                }
                await BaseDao.updateById("users", obj);
                res.send("success");
            }
        } catch (error) {
            if (error.message === "jwt must be provided") {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("token must be provided");
            } else {

                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
            }
        }
    }
};

export default UserRoute;
