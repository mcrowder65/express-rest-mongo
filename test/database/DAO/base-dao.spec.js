import BaseDao from "../../../src/database/DAO/base-dao";
import MongoConnectionManager from "../../../src/database/mongo-connection-manager";
/*eslint-disable max-nested-callbacks*/
/*eslint-disable no-unused-expressions*/
describe("test/database/DAO/base-dao.spec.js", () => {
    before(() => {
        //eslint-disable-next-line
        MongoConnectionManager.setUrl(27017, "mydb", "localhost");
    });
    describe("create", () => {
        describe("edge cases", () => {
            it("number as collection", async () => {
                expect(Promise.resolve(BaseDao.create(1, {}))).to.be.rejected;
            });
        });
        describe("standard", async () => {
            it("create and get", async () => {
                const obj = {hello: "world"};
                const collection = "hello";
                const _id = await BaseDao.create(collection, {...obj});
                const get = await BaseDao.getBy(collection, {_id});
                expect(get).eql({...obj, _id});
            });
            it("create and get and update", async () => {
                const obj = {hello: "world"};
                const collection = "hello";
                const _id = await BaseDao.create(collection, {...obj});
                const get = await BaseDao.getBy(collection, {_id});
                expect(get).eql({...obj, _id});
                const hello = "pickles";
                const result = await BaseDao.updateById(collection, {_id, hello});
                expect(result).eql({_id, hello});
            });
        });

    });
});

