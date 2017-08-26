import express from "express";

import user from "./user";

const router = express.Router();

router.route("/getUser").post(user.getUser);

export default router;