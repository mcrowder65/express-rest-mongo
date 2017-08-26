import express from "express";

import UserRoute from "./user-route";

const router = new express.Router();

router.route("/users/getAll").get(UserRoute.getAll);
router.route("/users/getBy").post(UserRoute.getBy);
router.route("/users/signup").post(UserRoute.signup);
router.route("/users/signin").post(UserRoute.signin);
router.route("/users/updateById").post(UserRoute.updateById);
router.route("/users/removeById").post(UserRoute.removeById);

export default router;
