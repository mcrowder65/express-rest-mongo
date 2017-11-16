import uniqueString from "unique-string";

import MongoUtils from "../../src/database/mongo-utils";
import MongoConnectionManager from "../../src/database/mongo-connection-manager";

describe("test/database/mongo-utils.spec.js", () => {
    beforeAll(() => {
        //eslint-disable-next-line
        MongoConnectionManager.setUrl(27017, "mydb", "localhost");
    });
    describe("doesCollectionExist", () => {
        test("does not exist", async () => {
            const collection = uniqueString();
            const res = await MongoUtils.doesCollectionExist(collection);
            expect(res).toEqual(false);
        });
        test("does exist", async () => {
            const collection = uniqueString();
            await MongoUtils.createCollectionIfNotExists(collection);
            const res = await MongoUtils.doesCollectionExist(collection);
            expect(res).toEqual(true);
        });
    });
    describe("createCollectionIfNotExists", () => {
        test("generate new collection", async () => {
            const collection = uniqueString();
            const res = await MongoUtils.createCollectionIfNotExists(collection);
            expect(res).toEqual(true);
        });
        test("try to generate collection which already exists", async () => {
            const collection = uniqueString();
            const res = await MongoUtils.createCollectionIfNotExists(collection);
            expect(res).toEqual(true);

            const secondRes = await MongoUtils.createCollectionIfNotExists(collection);
            expect(secondRes).toEqual(false);
        });
    });
});
