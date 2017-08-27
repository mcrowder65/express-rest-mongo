"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoUtils = require("./database/mongo-utils");

var _mongoUtils2 = _interopRequireDefault(_mongoUtils);

var _baseDao = require("./database/DAO/base-dao");

var _baseDao2 = _interopRequireDefault(_baseDao);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/*eslint max-statements: "off"*/
var Factory = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(collection, query, obj) {
        var res, _res, _id, newObj, updatedObj;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _mongoUtils2.default.createCollectionIfNotExists(collection);

                    case 2:
                        _context.t0 = query;
                        _context.next = _context.t0 === "getAll" ? 5 : _context.t0 === "getBy" ? 9 : _context.t0 === "create" ? 13 : _context.t0 === "updateById" ? 20 : _context.t0 === "removeById" ? 30 : 37;
                        break;

                    case 5:
                        _context.next = 7;
                        return _baseDao2.default.getAll(collection, obj);

                    case 7:
                        res = _context.sent;
                        return _context.abrupt("return", res);

                    case 9:
                        _context.next = 11;
                        return _baseDao2.default.getBy(collection, obj);

                    case 11:
                        _res = _context.sent;
                        return _context.abrupt("return", _res);

                    case 13:
                        _context.next = 15;
                        return _baseDao2.default.create(collection, obj);

                    case 15:
                        _id = _context.sent;
                        _context.next = 18;
                        return _baseDao2.default.getBy(collection, { _id: _id });

                    case 18:
                        newObj = _context.sent;
                        return _context.abrupt("return", newObj);

                    case 20:
                        if (obj._id) {
                            _context.next = 24;
                            break;
                        }

                        return _context.abrupt("return", "No id provided");

                    case 24:
                        _context.next = 26;
                        return _baseDao2.default.updateById(collection, obj);

                    case 26:
                        _context.next = 28;
                        return _baseDao2.default.getBy(collection, { _id: obj._id });

                    case 28:
                        updatedObj = _context.sent;
                        return _context.abrupt("return", updatedObj);

                    case 30:
                        if (obj._id) {
                            _context.next = 34;
                            break;
                        }

                        return _context.abrupt("return", "No id provided");

                    case 34:
                        _context.next = 36;
                        return _baseDao2.default.removeById(collection, obj._id);

                    case 36:
                        return _context.abrupt("return", {
                            message: "deleted!"
                        });

                    case 37:
                        return _context.abrupt("return", query + " not implemented yet");

                    case 38:
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