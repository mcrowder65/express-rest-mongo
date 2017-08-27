"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _httpStatusCodes = require("http-status-codes");

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _index = require("../constants/index");

var _index2 = _interopRequireDefault(_index);

var _jwt = require("../utilities/jwt");

var _jwt2 = _interopRequireDefault(_jwt);

var _userDao = require("../database/DAO/user-dao");

var _userDao2 = _interopRequireDefault(_userDao);

var _baseDao = require("../database/DAO/base-dao");

var _baseDao2 = _interopRequireDefault(_baseDao);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var UserRoute = {
    signup: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
            var _req$body, username, password, createdUser, newUser, token;

            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            _req$body = req.body, username = _req$body.username, password = _req$body.password;

                            if (username) {
                                _context.next = 6;
                                break;
                            }

                            res.status(_httpStatusCodes2.default.BAD_REQUEST).send("No username provided");
                            _context.next = 26;
                            break;

                        case 6:
                            if (password) {
                                _context.next = 10;
                                break;
                            }

                            res.status(_httpStatusCodes2.default.BAD_REQUEST).send("No password provided");
                            _context.next = 26;
                            break;

                        case 10:
                            _context.next = 12;
                            return _baseDao2.default.getBy("users", { username: username });

                        case 12:
                            createdUser = _context.sent;

                            if (!(createdUser && createdUser._id)) {
                                _context.next = 17;
                                break;
                            }

                            res.status(_httpStatusCodes2.default.FORBIDDEN).send("Username taken");
                            _context.next = 26;
                            break;

                        case 17:
                            _context.next = 19;
                            return _userDao2.default.create(username, password);

                        case 19:
                            _context.next = 21;
                            return _baseDao2.default.getBy("users", { username: username });

                        case 21:
                            newUser = _context.sent;
                            _context.next = 24;
                            return _jwt2.default.generateToken(newUser.username, newUser.id);

                        case 24:
                            token = _context.sent;

                            res.send(_extends({}, newUser, { password: undefined, token: token }));

                        case 26:
                            _context.next = 31;
                            break;

                        case 28:
                            _context.prev = 28;
                            _context.t0 = _context["catch"](0);

                            res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).send(_context.t0.message);

                        case 31:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, undefined, [[0, 28]]);
        }));

        return function signup(_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }(),
    signin: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
            var _req$body2, username, password, user;

            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.prev = 0;
                            _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password;

                            if (!username) {
                                res.status(_httpStatusCodes2.default.BAD_REQUEST).send("No username provided");
                            } else if (!password) {
                                res.status(_httpStatusCodes2.default.BAD_REQUEST).send("No password provided");
                            }
                            _context3.next = 5;
                            return _baseDao2.default.getBy("users", { username: username });

                        case 5:
                            user = _context3.sent;

                            if (!user || !user._id) {
                                res.status(_httpStatusCodes2.default.FORBIDDEN).send("Username doesn\'t exist");
                            } else {

                                _bcrypt2.default.compare(password, user.password).then(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(result) {
                                        var token;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        if (!result) {
                                                            _context2.next = 7;
                                                            break;
                                                        }

                                                        _context2.next = 3;
                                                        return _jwt2.default.generateToken(user.username, user._id);

                                                    case 3:
                                                        token = _context2.sent;

                                                        res.send(_extends({}, user, { password: undefined, token: token }));
                                                        _context2.next = 8;
                                                        break;

                                                    case 7:
                                                        res.status(_httpStatusCodes2.default.FORBIDDEN).send("Invalid password");

                                                    case 8:
                                                    case "end":
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, undefined);
                                    }));

                                    return function (_x5) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                            }

                            _context3.next = 12;
                            break;

                        case 9:
                            _context3.prev = 9;
                            _context3.t0 = _context3["catch"](0);

                            res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).send(_context3.t0.message);

                        case 12:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined, [[0, 9]]);
        }));

        return function signin(_x3, _x4) {
            return _ref2.apply(this, arguments);
        };
    }(),
    updateById: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
            var _req$body3, token, _id, decoded, obj, salt, hash;

            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.prev = 0;
                            _req$body3 = req.body, token = _req$body3.token, _id = _req$body3._id;
                            _context4.next = 4;
                            return _jwt2.default.verifyToken(token);

                        case 4:
                            decoded = _context4.sent;

                            if (!(decoded._id !== _id)) {
                                _context4.next = 9;
                                break;
                            }

                            res.status(_httpStatusCodes2.default.FORBIDDEN).send("You can\'t updateById someone else");
                            _context4.next = 14;
                            break;

                        case 9:
                            obj = req.body;

                            if (req.body.password) {
                                salt = _bcrypt2.default.genSaltSync(_index2.default.SALT_ROUNDS);
                                hash = _bcrypt2.default.hashSync(req.body.password, salt);

                                obj = _extends({}, obj, {
                                    password: hash
                                });
                            }
                            _context4.next = 13;
                            return _baseDao2.default.updateById("users", obj);

                        case 13:
                            res.send("success");

                        case 14:
                            _context4.next = 19;
                            break;

                        case 16:
                            _context4.prev = 16;
                            _context4.t0 = _context4["catch"](0);

                            if (_context4.t0.message === "jwt must be provided") {
                                res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).send("token must be provided");
                            } else {

                                res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).send(_context4.t0.message);
                            }

                        case 19:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4, undefined, [[0, 16]]);
        }));

        return function updateById(_x6, _x7) {
            return _ref4.apply(this, arguments);
        };
    }()
};

exports.default = UserRoute;