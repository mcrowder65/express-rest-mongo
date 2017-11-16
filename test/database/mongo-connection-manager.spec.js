import uniqueString from "unique-string";

import MongoConnectionManager from "../../src/database/mongo-connection-manager";
import configDefaults from "../../src/constants/config-defaults";

describe("test/database/mongo-connection-manager.spec.js", () => {
    const {expressPort: port, mongoIp: mongoUrl} = configDefaults;
    const db = uniqueString();
    test("port null", () => {
        expect(() => MongoConnectionManager.setUrl(null, db, mongoUrl)).toThrow();
    });
    test("db null", () => {
        expect(() => MongoConnectionManager.setUrl(port, null, mongoUrl)).toThrow();
    });
    test("mongoUrl null", () => {
        expect(() => MongoConnectionManager.setUrl(port, db, null)).toThrow();
    });
    test("all 3 defined", () => {
        //TODO this is just here for code coverage, and will be solved once url is scoped properly
        MongoConnectionManager.setUrl(port, db, mongoUrl);
    });
});
