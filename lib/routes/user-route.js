"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _httpStatusCodes = require("http-status-codes");

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jwt = require("../utilities/jwt");

var _jwt2 = _interopRequireDefault(_jwt);

var _userDao = require("../database/DAO/user-dao");

var _userDao2 = _interopRequireDefault(_userDao);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var UserRoute = {
    getAll: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
            var users;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            _context.next = 3;
                            return _userDao2.default.getAll({}, { password: false });

                        case 3:
                            users = _context.sent;

                            res.send(users);
                            _context.next = 10;
                            break;

                        case 7:
                            _context.prev = 7;
                            _context.t0 = _context["catch"](0);

                            res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).send(_context.t0.message);

                        case 10:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, undefined, [[0, 7]]);
        }));

        return function getAll(_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }(),
    getBy: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
            var user;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.prev = 0;

                            if (!(Object.keys(req.body).length === 0)) {
                                _context2.next = 5;
                                break;
                            }

                            res.status(_httpStatusCodes2.default.BAD_REQUEST).send("No keys provided");
                            _context2.next = 9;
                            break;

                        case 5:
                            _context2.next = 7;
                            return _userDao2.default.getBy(req.body, { password: false });

                        case 7:
                            user = _context2.sent;

                            res.send(user);

                        case 9:
                            _context2.next = 14;
                            break;

                        case 11:
                            _context2.prev = 11;
                            _context2.t0 = _context2["catch"](0);

                            res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).send(_context2.t0.message);

                        case 14:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined, [[0, 11]]);
        }));

        return function getBy(_x3, _x4) {
            return _ref2.apply(this, arguments);
        };
    }(),
    signup: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
            var _req$body, username, password, createdUser, newUser, token;

            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.prev = 0;
                            _req$body = req.body, username = _req$body.username, password = _req$body.password;

                            if (!username) {
                                res.status(_httpStatusCodes2.default.BAD_REQUEST).send("No username provided");
                            } else if (!password) {
                                res.status(_httpStatusCodes2.default.BAD_REQUEST).send("No password provided");
                            }
                            _context3.next = 5;
                            return _userDao2.default.getBy({ username: username });

                        case 5:
                            createdUser = _context3.sent;

                            if (!createdUser) {
                                _context3.next = 10;
                                break;
                            }

                            res.status(_httpStatusCodes2.default.FORBIDDEN).send("Username taken");
                            _context3.next = 19;
                            break;

                        case 10:
                            _context3.next = 12;
                            return _userDao2.default.create(username, password);

                        case 12:
                            _context3.next = 14;
                            return _userDao2.default.getBy({ username: username });

                        case 14:
                            newUser = _context3.sent;
                            _context3.next = 17;
                            return _jwt2.default.generateToken(newUser.username, newUser.id);

                        case 17:
                            token = _context3.sent;

                            res.send(_extends({}, newUser, { password: undefined, token: token }));

                        case 19:
                            _context3.next = 24;
                            break;

                        case 21:
                            _context3.prev = 21;
                            _context3.t0 = _context3["catch"](0);

                            res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).send(_context3.t0.message);

                        case 24:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined, [[0, 21]]);
        }));

        return function signup(_x5, _x6) {
            return _ref3.apply(this, arguments);
        };
    }(),
    signin: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
            var _req$body2, username, password, user;

            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.prev = 0;
                            _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password;

                            if (!username) {
                                res.status(_httpStatusCodes2.default.BAD_REQUEST).send("No username provided");
                            } else if (!password) {
                                res.status(_httpStatusCodes2.default.BAD_REQUEST).send("No password provided");
                            }
                            _context5.next = 5;
                            return _userDao2.default.getBy({ username: username });

                        case 5:
                            user = _context5.sent;

                            if (!user) {
                                res.status(_httpStatusCodes2.default.FORBIDDEN).send("Username doesn\'t exist");
                            }
                            _bcrypt2.default.compare(password, user.password).then(function () {
                                var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(result) {
                                    var token;
                                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                        while (1) {
                                            switch (_context4.prev = _context4.next) {
                                                case 0:
                                                    if (!result) {
                                                        _context4.next = 7;
                                                        break;
                                                    }

                                                    _context4.next = 3;
                                                    return _jwt2.default.generateToken(user.username, user._id);

                                                case 3:
                                                    token = _context4.sent;

                                                    res.send(_extends({}, user, { password: undefined, token: token }));
                                                    _context4.next = 8;
                                                    break;

                                                case 7:
                                                    res.status(_httpStatusCodes2.default.FORBIDDEN).send("Invalid password");

                                                case 8:
                                                case "end":
                                                    return _context4.stop();
                                            }
                                        }
                                    }, _callee4, undefined);
                                }));

                                return function (_x9) {
                                    return _ref5.apply(this, arguments);
                                };
                            }());

                            _context5.next = 13;
                            break;

                        case 10:
                            _context5.prev = 10;
                            _context5.t0 = _context5["catch"](0);

                            res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).send(_context5.t0.message);

                        case 13:
                        case "end":
                            return _context5.stop();
                    }
                }
            }, _callee5, undefined, [[0, 10]]);
        }));

        return function signin(_x7, _x8) {
            return _ref4.apply(this, arguments);
        };
    }(),
    updateById: function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
            var _req$body3, token, _id, decoded;

            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            _context6.prev = 0;
                            _req$body3 = req.body, token = _req$body3.token, _id = _req$body3._id;
                            _context6.next = 4;
                            return _jwt2.default.verifyToken(token);

                        case 4:
                            decoded = _context6.sent;

                            if (!(decoded._id !== _id)) {
                                _context6.next = 9;
                                break;
                            }

                            res.status(_httpStatusCodes2.default.FORBIDDEN).send("You can\'t updateById someone else");
                            _context6.next = 12;
                            break;

                        case 9:
                            _context6.next = 11;
                            return _userDao2.default.updateById(req.body);

                        case 11:
                            res.send("success");

                        case 12:
                            _context6.next = 17;
                            break;

                        case 14:
                            _context6.prev = 14;
                            _context6.t0 = _context6["catch"](0);

                            res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).send(_context6.t0.message);

                        case 17:
                        case "end":
                            return _context6.stop();
                    }
                }
            }, _callee6, undefined, [[0, 14]]);
        }));

        return function updateById(_x10, _x11) {
            return _ref6.apply(this, arguments);
        };
    }(),
    removeById: function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
            var _id;

            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            _context7.prev = 0;
                            _id = req.body._id;
                            _context7.next = 4;
                            return _userDao2.default.removeById(_id);

                        case 4:
                            res.send("success");
                            _context7.next = 10;
                            break;

                        case 7:
                            _context7.prev = 7;
                            _context7.t0 = _context7["catch"](0);

                            res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).send(_context7.t0.message);

                        case 10:
                        case "end":
                            return _context7.stop();
                    }
                }
            }, _callee7, undefined, [[0, 7]]);
        }));

        return function removeById(_x12, _x13) {
            return _ref7.apply(this, arguments);
        };
    }()
};

exports.default = UserRoute;