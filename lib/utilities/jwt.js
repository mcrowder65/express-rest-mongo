"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SECRET = "\x1f\x1e1\x8a\x8djO\x9e\xe4\xcb\x9d`\x13\x02\xfb+\xbb\x89q\"F\x8a\xe0a";

var jwt = {
    generateToken: function generateToken(username, _id) {
        return _jsonwebtoken2.default.sign({
            username: username,
            _id: _id
        }, SECRET);
    },
    verifyToken: function verifyToken(token) {
        return new Promise(function (resolve, reject) {
            try {
                _jsonwebtoken2.default.verify(token, SECRET, function (err, decoded) {
                    try {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(decoded);
                        }
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }
};

exports.default = jwt;