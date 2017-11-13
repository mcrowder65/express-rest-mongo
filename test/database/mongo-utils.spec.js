import uniqueString from "unique-string";

import MongoUtils from "../../src/database/mongo-utils";
import MongoConnectionManager from "../../src/database/mongo-connection-manager";

describe("test/database/mongo-utils.spec.js", () => {
    before(() => {
        //eslint-disable-next-line
        MongoConnectionManager.setUrl(27017, "mydb", "localhost");
    });
    describe("doesCollectionExist", () => {
        it("does not exist", async () => {
            const collection = uniqueString();
            const res = await MongoUtils.doesCollectionExist(collection);
            expect(res).equal(false);
        });
        it("does exist", async () => {
            const collection = uniqueString();
            await MongoUtils.createCollectionIfNotExists(collection);
            const res = await MongoUtils.doesCollectionExist(collection);
            expect(res).equal(true);
        });
    });
    describe("createCollectionIfNotExists", () => {
        it("generate new collection", async () => {
            const collection = uniqueString();
            const res = await MongoUtils.createCollectionIfNotExists(collection);
            expect(res).equal(true);
        });
        it("try to generate collection which already exists", async () => {
            const collection = uniqueString();
            const res = await MongoUtils.createCollectionIfNotExists(collection);
            expect(res).equal(true);

            const secondRes = await MongoUtils.createCollectionIfNotExists(collection);
            expect(secondRes).equal(false);
        });
    });
});
