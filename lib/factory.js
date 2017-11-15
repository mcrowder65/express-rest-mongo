"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoUtils = require("./database/mongo-utils");

var _mongoUtils2 = _interopRequireDefault(_mongoUtils);

var _baseDao = require("./database/DAO/base-dao");

var _baseDao2 = _interopRequireDefault(_baseDao);

var _dbActionTypes = require("./constants/db-action-types");

var _dbActionTypes2 = _interopRequireDefault(_dbActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//eslint-disable-next-line
var Factory = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(collection, query, obj) {
        var _id;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _mongoUtils2.default.createCollectionIfNotExists(collection);

                    case 2:
                        _context.t0 = query;
                        _context.next = _context.t0 === _dbActionTypes2.default.GET_ALL ? 5 : _context.t0 === _dbActionTypes2.default.GET_BY ? 6 : _context.t0 === _dbActionTypes2.default.CREATE ? 7 : _context.t0 === _dbActionTypes2.default.REMOVE_BY_ID ? 11 : _context.t0 === _dbActionTypes2.default.UPDATE_BY_ID ? 18 : 25;
                        break;

                    case 5:
                        return _context.abrupt("return", _baseDao2.default.getAll(collection, obj));

                    case 6:
                        return _context.abrupt("return", _baseDao2.default.getBy(collection, obj));

                    case 7:
                        _context.next = 9;
                        return _baseDao2.default.create(collection, obj);

                    case 9:
                        _id = _context.sent;
                        return _context.abrupt("return", _baseDao2.default.getBy(collection, { _id: _id }));

                    case 11:
                        if (obj._id) {
                            _context.next = 15;
                            break;
                        }

                        return _context.abrupt("return", "No id provided");

                    case 15:
                        _context.next = 17;
                        return _baseDao2.default.removeById(collection, obj._id);

                    case 17:
                        return _context.abrupt("return", {
                            message: "deleted!"
                        });

                    case 18:
                        if (obj._id) {
                            _context.next = 22;
                            break;
                        }

                        return _context.abrupt("return", "No id provided");

                    case 22:
                        _context.next = 24;
                        return _baseDao2.default.updateById(collection, obj);

                    case 24:
                        return _context.abrupt("return", _baseDao2.default.getBy(collection, { _id: obj._id }));

                    case 25:
                        return _context.abrupt("return", query + " not implemented yet");

                    case 26:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function Factory(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

exports.default = Factory;