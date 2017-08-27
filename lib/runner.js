"use strict";

var _expressRestMongo = require("./express-rest-mongo");

var _expressRestMongo2 = _interopRequireDefault(_expressRestMongo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _expressRestMongo2.default({
    port: 3000,
    db: "tempDb",
    mongoPort: 27017
});

app.run();