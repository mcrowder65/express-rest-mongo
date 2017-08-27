"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _mongoConnectionManager = require("../mongo-connection-manager");

var _mongoConnectionManager2 = _interopRequireDefault(_mongoConnectionManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ObjectId = require("mongodb").ObjectId;
//TODO is there a way to abstract the collection checks?
var BaseDao = {
    getAll: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(collection, obj, exclusion) {
            var db;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (!(typeof collection !== "string")) {
                                _context.next = 2;
                                break;
                            }

                            throw new Error("Collection either not provided or is not a string");

                        case 2:
                            _context.next = 4;
                            return _mongoConnectionManager2.default.getConnection();

                        case 4:
                            db = _context.sent;

                            obj = obj._id ? _extends({}, obj, {
                                _id: new ObjectId(obj._id)
                            }) : obj;
                            return _context.abrupt("return", new Promise(function (resolve, reject) {
                                db.collection(collection).find(obj || {}, exclusion || {}).toArray(function (err, result) {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        resolve(result);
                                    }
                                    db.close();
                                });
                            }));

                        case 7:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function getAll(_x, _x2, _x3) {
            return _ref.apply(this, arguments);
        };
    }(),
    getBy: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(collection, obj) {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            if (!(typeof collection !== "string")) {
                                _context3.next = 2;
                                break;
                            }

                            throw new Error("Collection either not provided or is not a string");

                        case 2:
                            return _context3.abrupt("return", new Promise(function () {
                                var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
                                    var db;
                                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                        while (1) {
                                            switch (_context2.prev = _context2.next) {
                                                case 0:
                                                    _context2.next = 2;
                                                    return _mongoConnectionManager2.default.getConnection();

                                                case 2:
                                                    db = _context2.sent;

                                                    obj = obj._id ? _extends({}, obj, {
                                                        _id: new ObjectId(obj._id)
                                                    }) : obj;
                                                    db.collection(collection).findOne(obj, function (err, result) {
                                                        if (err) {
                                                            reject("Couldn't findOne");
                                                        } else {
                                                            resolve(result || {});
                                                        }
                                                        db.close();
                                                    });

                                                case 5:
                                                case "end":
                                                    return _context2.stop();
                                            }
                                        }
                                    }, _callee2, undefined);
                                }));

                                return function (_x6, _x7) {
                                    return _ref3.apply(this, arguments);
                                };
                            }()));

                        case 3:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined);
        }));

        return function getBy(_x4, _x5) {
            return _ref2.apply(this, arguments);
        };
    }(),
    create: function create(collection, obj) {
        if (typeof collection !== "string") {
            throw new Error("Collection either not provided or is not a string");
        }
        return new Promise(function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(resolve, reject) {
                var db;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return _mongoConnectionManager2.default.getConnection();

                            case 2:
                                db = _context4.sent;

                                db.collection(collection).insertOne(obj, function (err, res) {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        resolve(res.insertedId);
                                    }
                                    db.close();
                                });

                            case 4:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, undefined);
            }));

            return function (_x8, _x9) {
                return _ref4.apply(this, arguments);
            };
        }());
    },
    updateById: function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(collection, obj) {
            var storedObj, o;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            if (!(typeof collection !== "string")) {
                                _context5.next = 2;
                                break;
                            }

                            throw new Error("Collection either not provided or is not a string");

                        case 2:
                            _context5.next = 4;
                            return BaseDao.getBy(collection, { _id: obj._id });

                        case 4:
                            storedObj = _context5.sent;
                            _context5.next = 7;
                            return BaseDao.removeById(collection, obj._id);

                        case 7:
                            o = _extends({}, storedObj, obj, {
                                _id: storedObj._id
                            });

                            delete o.token;
                            _context5.next = 11;
                            return BaseDao.create(collection, o);

                        case 11:
                        case "end":
                            return _context5.stop();
                    }
                }
            }, _callee5, undefined);
        }));

        return function updateById(_x10, _x11) {
            return _ref5.apply(this, arguments);
        };
    }(),
    removeById: function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(collection, _id) {
            var db;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            if (!(typeof collection !== "string")) {
                                _context6.next = 2;
                                break;
                            }

                            throw new Error("Collection either not provided or is not a string");

                        case 2:
                            _id = new ObjectId(_id);
                            _context6.next = 5;
                            return _mongoConnectionManager2.default.getConnection();

                        case 5:
                            db = _context6.sent;
                            return _context6.abrupt("return", new Promise(function (resolve, reject) {
                                db.collection(collection).removeOne({ _id: _id }, function (err, res) {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        resolve(res);
                                    }
                                    db.close();
                                });
                            }));

                        case 7:
                        case "end":
                            return _context6.stop();
                    }
                }
            }, _callee6, undefined);
        }));

        return function removeById(_x12, _x13) {
            return _ref6.apply(this, arguments);
        };
    }()
};

exports.default = BaseDao;