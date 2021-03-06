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

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

require("babel-polyfill");

var _constants = require("./constants");

var _constants2 = _interopRequireDefault(_constants);

var _configDefaults = require("./constants/config-defaults");

var _configDefaults2 = _interopRequireDefault(_configDefaults);

var _mongoConnectionManager = require("./database/mongo-connection-manager");

var _mongoConnectionManager2 = _interopRequireDefault(_mongoConnectionManager);

var _factory = require("./factory");

var _factory2 = _interopRequireDefault(_factory);

var _routes = require("./routes/routes");

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*global console*/

/*eslint-disable no-console*/

var ExpressRestMongo = function () {
    //eslint-disable-next-line
    function ExpressRestMongo(config) {
        _classCallCheck(this, ExpressRestMongo);

        if (!config.port) {
            console.log("RUNNING ON PORT " + _configDefaults2.default.expressPort + " SINCE PORT WAS NOT PROVIDED");
        }
        this.port = config.port || _configDefaults2.default.expressPort;

        if (!config.db) {
            throw new Error("db required");
        }

        this.db = config.db;

        if (!config.mongoPort) {
            console.log("CONNECTING TO PORT " + _configDefaults2.default.mongoPort + " FOR MONGO SINCE NONE SPECIFIED");
        }
        this.mongoPort = config.mongoPort || _configDefaults2.default.mongoPort;

        if (!config.mongoIp) {
            console.log("SETTING MONGO IP TO " + _configDefaults2.default.mongoIp + " SINCE NONE PROVIDED");
        }
        this.mongoIp = config.mongoIp || _configDefaults2.default.mongoIp;

        this.customRoutes = config.customRoutes;
        this.collections = config.collections || [];
        //TODO add html config location to documentation
        this.indexFile = config.indexFile;
        this.buildFolder = config.buildFolder;
        this.app = null;
        this.server = null;
    }

    _createClass(ExpressRestMongo, [{
        key: "run",
        value: function run() {
            var _this = this;

            this.app = (0, _express2.default)();

            this.app.use(_bodyParser2.default.json());
            this.app.use(_bodyParser2.default.urlencoded({ extended: true }));
            if (this.customRoutes) {
                this.app.use(this.customRoutes);
            }
            /*global __dirname: true*/
            this.app.use(_express2.default.static(_path2.default.resolve(__dirname, "../../..", "build")));

            this.app.get("*", function (req, res) {
                res.sendFile(_path2.default.resolve(__dirname, "../../..", "build", "index.html"));
            });
            this.app.use(_routes2.default);
            _mongoConnectionManager2.default.setUrl(this.mongoPort, this.db, this.mongoIp);

            this.app.post("*", function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
                    var arr, collection, action, result;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;
                                    arr = req.originalUrl.split("/").filter(function (e) {
                                        return e !== "";
                                    });

                                    if (!(arr.length !== _constants2.default.AMOUNT_OF_PARAMS)) {
                                        _context.next = 4;
                                        break;
                                    }

                                    throw new Error("Invalid request, need " + _constants2.default.AMOUNT_OF_PARAMS + " parts in request");

                                case 4:
                                    collection = arr[0];

                                    if (!(_this.collections.length > 0 && _this.collections.indexOf(collection) === -1)) {
                                        _context.next = 7;
                                        break;
                                    }

                                    throw new Error(collection + " is not in the list of collections");

                                case 7:
                                    action = arr[1];
                                    _context.next = 10;
                                    return (0, _factory2.default)(collection, action, req.body);

                                case 10:
                                    result = _context.sent;

                                    res.send(result);
                                    _context.next = 17;
                                    break;

                                case 14:
                                    _context.prev = 14;
                                    _context.t0 = _context["catch"](0);

                                    res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).send(_context.t0.message);

                                case 17:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[0, 14]]);
                }));

                return function (_x, _x2) {
                    return _ref.apply(this, arguments);
                };
            }());

            var port = this.port;
            // return new Promise(resolve => {

            this.server = this.app.listen(port);
        }
    }, {
        key: "stop",
        value: function stop() {
            this.server.close();
        }
    }]);

    return ExpressRestMongo;
}();

exports.default = ExpressRestMongo;