"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _index = require("../../constants/index");

var _index2 = _interopRequireDefault(_index);

var _baseDao = require("./base-dao");

var _baseDao2 = _interopRequireDefault(_baseDao);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var collection = "users";

var UserDao = {
    getAll: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(obj, exclusion) {
            var users;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return _baseDao2.default.getAll(collection, obj, exclusion);

                        case 2:
                            users = _context.sent;
                            return _context.abrupt("return", users);

                        case 4:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function getAll(_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }(),
    getBy: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(obj, exclusion) {
            var result;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return _baseDao2.default.getBy(collection, obj, exclusion);

                        case 2:
                            result = _context2.sent;
                            return _context2.abrupt("return", result);

                        case 4:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        }));

        return function getBy(_x3, _x4) {
            return _ref2.apply(this, arguments);
        };
    }(),
    create: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(username, password) {
            var salt, hash;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            salt = _bcrypt2.default.genSaltSync(_index2.default.SALT_ROUNDS);
                            hash = _bcrypt2.default.hashSync(password, salt);
                            _context3.next = 4;
                            return _baseDao2.default.create(collection, {
                                username: username,
                                password: hash
                            });

                        case 4:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined);
        }));

        return function create(_x5, _x6) {
            return _ref3.apply(this, arguments);
        };
    }(),
    updateById: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(obj) {
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return _baseDao2.default.updateById(collection, obj);

                        case 2:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4, undefined);
        }));

        return function updateById(_x7) {
            return _ref4.apply(this, arguments);
        };
    }(),
    removeById: function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_id) {
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.next = 2;
                            return _baseDao2.default.removeById(collection, _id);

                        case 2:
                        case "end":
                            return _context5.stop();
                    }
                }
            }, _callee5, undefined);
        }));

        return function removeById(_x8) {
            return _ref5.apply(this, arguments);
        };
    }()
};

exports.default = UserDao;