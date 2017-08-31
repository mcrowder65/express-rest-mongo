"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _dbActionTypes = require("../constants/db-action-types");

var _dbActionTypes2 = _interopRequireDefault(_dbActionTypes);

var _userRoute = require("./user-route");

var _userRoute2 = _interopRequireDefault(_userRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express2.default.Router();

router.route("/users/" + _dbActionTypes2.default.SIGNUP).post(_userRoute2.default.signup);
router.route("/users/" + _dbActionTypes2.default.SIGNIN).post(_userRoute2.default.signin);
router.route("/users/" + _dbActionTypes2.default.UPDATE_BY_ID).post(_userRoute2.default.updateById);
exports.default = router;