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
    genSalt: function genSalt() {
        return new Promise(function (resolve, reject) {
            _bcrypt2.default.genSalt(_index2.default.SALT_ROUNDS, function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err, salt) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    if (err) {
                                        reject(err);
                                    } else {
                                        resolve(salt);
                                    }

                                case 1:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee, undefined);
                }));

                return function (_x, _x2) {
                    return _ref.apply(this, arguments);
                };
            }());
        });
    },
    genHash: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(password, salt) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            return _context2.abrupt("return", new Promise(function (resolve, reject) {
                                _bcrypt2.default.hash(password, salt, function (err, hash) {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        resolve(hash);
                                    }
                                });
                            }));

                        case 1:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        }));

        return function genHash(_x3, _x4) {
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
                            _context3.next = 2;
                            return UserDao.genSalt();

                        case 2:
                            salt = _context3.sent;
                            _context3.next = 5;
                            return UserDao.genHash(password, salt);

                        case 5:
                            hash = _context3.sent;
                            return _context3.abrupt("return", _baseDao2.default.create(collection, {
                                username: username,
                                password: hash
                            }));

                        case 7:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined);
        }));

        return function create(_x5, _x6) {
            return _ref3.apply(this, arguments);
        };
    }()
};

exports.default = UserDao;