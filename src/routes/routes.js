import express from "express";

import UserRoute from "./user-route";

const router = new express.Router();

router.route("/users/signup").post(UserRoute.signup);
router.route("/users/signin").post(UserRoute.signin);

export default router;
