"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoConnectionManager = require("./mongo-connection-manager");

var _mongoConnectionManager2 = _interopRequireDefault(_mongoConnectionManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var MongoUtils = {
    doesCollectionExist: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(collection) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            return _context2.abrupt("return", new Promise(function () {
                                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
                                    var db;
                                    return regeneratorRuntime.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    _context.prev = 0;
                                                    _context.next = 3;
                                                    return _mongoConnectionManager2.default.getConnection();

                                                case 3:
                                                    db = _context.sent;

                                                    db.listCollections({ name: collection }).next(function (err, collectionInfo) {
                                                        if (err) {
                                                            reject("Couldn't list collections");
                                                        } else if (collectionInfo) {
                                                            resolve(true);
                                                        } else {
                                                            resolve(false);
                                                        }
                                                        db.close();
                                                    });

                                                    _context.next = 10;
                                                    break;

                                                case 7:
                                                    _context.prev = 7;
                                                    _context.t0 = _context["catch"](0);

                                                    reject(_context.t0);

                                                case 10:
                                                case "end":
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, undefined, [[0, 7]]);
                                }));

                                return function (_x2, _x3) {
                                    return _ref2.apply(this, arguments);
                                };
                            }()));

                        case 1:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        }));

        return function doesCollectionExist(_x) {
            return _ref.apply(this, arguments);
        };
    }(),
    createCollectionIfNotExists: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(collection) {
            var doesExist, db;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return MongoUtils.doesCollectionExist(collection);

                        case 2:
                            doesExist = _context3.sent;

                            if (!doesExist) {
                                _context3.next = 7;
                                break;
                            }

                            return _context3.abrupt("return", false);

                        case 7:
                            _context3.next = 9;
                            return _mongoConnectionManager2.default.getConnection();

                        case 9:
                            db = _context3.sent;
                            return _context3.abrupt("return", new Promise(function (resolve, reject) {
                                db.createCollection(collection, function (err) {
                                    if (err) {
                                        reject(false);
                                    } else {
                                        resolve(true);
                                    }
                                    db.close();
                                });
                            }));

                        case 11:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined);
        }));

        return function createCollectionIfNotExists(_x4) {
            return _ref3.apply(this, arguments);
        };
    }()
};

exports.default = MongoUtils;