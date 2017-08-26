import express from "express";

import UserRoute from "./user-route";

const router = new express.Router();

router.route("/getAll").get(UserRoute.getAll);
router.route("/getBy").post(UserRoute.getBy);
router.route("/create").post(UserRoute.create);
router.route("/signin").post(UserRoute.signin);

export default router;
