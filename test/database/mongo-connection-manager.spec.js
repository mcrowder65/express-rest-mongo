import MongoConnectionManager from "../../src/database/mongo-connection-manager";

/*eslint-disable max-nested-callbacks*/

describe("test/database/mongo-connection-manager.spec.js", () => {
    describe("setUrl", () => {
        const port = 27017;
        const db = "mydb";
        const mongoUrl = "localhost";
        it("port null", () => {
            expect(() => MongoConnectionManager.setUrl(null, db, mongoUrl)).to.throw();
        });
        it("db null", () => {
            expect(() => MongoConnectionManager.setUrl(port, null, mongoUrl)).to.throw();
        });
        it("mongoUrl null", () => {
            expect(() => MongoConnectionManager.setUrl(port, db, null)).to.throw();
        });
    });
});
