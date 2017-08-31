import express from "express";

import DbActionTypes from "../constants/db-action-types";
import UserRoute from "./user-route";

const router = new express.Router();

router.route(`/users/${DbActionTypes.SIGNUP}`).post(UserRoute.signup);
router.route(`/users/${DbActionTypes.SIGNIN}`).post(UserRoute.signin);
router.route(`/users/${DbActionTypes.UPDATE_BY_ID}`).post(UserRoute.updateById);
export default router;
