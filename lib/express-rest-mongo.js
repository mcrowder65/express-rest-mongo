"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _httpStatusCodes = require("http-status-codes");

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

require("babel-polyfill");

var _factory = require("./factory");

var _factory2 = _interopRequireDefault(_factory);

var _routes = require("./routes/routes");

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*eslint no-invalid-this: "off"*/
var ExpressRestMongo = function () {
    function ExpressRestMongo(config) {
        _classCallCheck(this, ExpressRestMongo);

        if (!config.port) {
            throw new Error("port required");
        }
        this.port = config.port;
        // TODO add custom routes
        // this.customRoutes = config.customRoutes || {};
    }

    _createClass(ExpressRestMongo, [{
        key: "run",
        value: function run() {
            var _this = this;

            var app = (0, _express2.default)();
            app.use(_bodyParser2.default.json());
            app.use(_bodyParser2.default.urlencoded({ extended: true }));
            app.use(_routes2.default);

            app.post("*", function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
                    var arr, result;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;
                                    arr = req.originalUrl.split("/").filter(function (e) {
                                        return e !== "";
                                    });
                                    _context.next = 4;
                                    return (0, _factory2.default)(arr[0], arr[1], req.body);

                                case 4:
                                    result = _context.sent;

                                    res.send(result);
                                    _context.next = 12;
                                    break;

                                case 8:
                                    _context.prev = 8;
                                    _context.t0 = _context["catch"](0);

                                    console.log("error in root ", _context.t0);
                                    res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).send(_context.t0.message);

                                case 12:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[0, 8]]);
                }));

                return function (_x, _x2) {
                    return _ref.apply(this, arguments);
                };
            }());
            var port = this.port;

            app.listen(port, function () {
                /*eslint no-console: "off"*/
                /*global console: true*/
                console.log("Server started on port " + port);
            });
        }
    }]);

    return ExpressRestMongo;
}();

exports.default = ExpressRestMongo;