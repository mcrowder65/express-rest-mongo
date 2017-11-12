import BaseDao from "../../../src/database/DAO/base-dao";
import MongoConnectionManager from "../../../src/database/mongo-connection-manager";
/*eslint-disable max-nested-callbacks*/
/*eslint-disable no-unused-expressions*/
describe("test/database/DAO/base-dao.spec.js", () => {
    describe("create", () => {
        describe("edge cases", () => {
            it("number as collection", async () => {
                expect(Promise.resolve(BaseDao.create(1, {}))).to.be.rejected;
            });
        });
        describe("standard", async () => {
            it("create and get", async () => {

                const port = 27017;
                MongoConnectionManager.setUrl(port, "mydb", "localhost");
                const obj = {hello: "world"};
                const _id = await BaseDao.create("hello", {...obj});
                const get = await BaseDao.getBy("hello", {_id});
                expect(get).eql({...obj, _id});
            });
        });

    });
});

