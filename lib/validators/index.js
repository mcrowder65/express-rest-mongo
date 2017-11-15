"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var stringValidator = exports.stringValidator = function stringValidator(str) {
    if (!str) {
        throw new Error("str not defined");
    }
    if (typeof str !== "string") {
        throw new Error("str is not a string");
    }
    return str;
};