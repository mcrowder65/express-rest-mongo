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
    create: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(username, password) {
            var salt, hash;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            salt = _bcrypt2.default.genSaltSync(_index2.default.SALT_ROUNDS);
                            hash = _bcrypt2.default.hashSync(password, salt);
                            _context.next = 4;
                            return _baseDao2.default.create(collection, {
                                username: username,
                                password: hash
                            });

                        case 4:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function create(_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }()
};

exports.default = UserDao;