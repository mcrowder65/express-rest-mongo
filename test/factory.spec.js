import uniqueString from "unique-string";

import factory from "../src/factory";
import DbActionTypes from "../src/constants/db-action-types";
import MongoConnectionManager from "../src/database/mongo-connection-manager";
import configDefaults from "../src/constants/config-defaults";
import BaseDao from "../src/database/DAO/base-dao";

describe("test/factory.spec.js", () => {
    before(() => {
        MongoConnectionManager.setUrl(configDefaults.mongoPort, "mydb", configDefaults.mongoIp);
    });
    it(DbActionTypes.CREATE, async () => {
        const collection = uniqueString();
        const msg1 = "world";
        const msg2 = "cheese";
        const obj = {msg1, msg2};
        const result = await factory(collection, DbActionTypes.CREATE, obj);
        expect({msg1: result.msg1, msg2: result.msg2}).eql(obj);
    });
    describe(DbActionTypes.REMOVE_BY_ID, () => {
        it("no id provided", async () => {
            const collection = uniqueString();
            const result = await factory(collection, DbActionTypes.REMOVE_BY_ID, {});
            expect(result).equal("No id provided");
        });
        it("delete by id", async () => {
            const collection = uniqueString();
            const obj = {
                msg1: "hello",
                msg2: "hello2"
            };
            const _id = await BaseDao.create(collection, obj);
            const result = await factory(collection, DbActionTypes.REMOVE_BY_ID, {_id});
            expect(result).eql({message: "deleted!"});
        });
    });
    it(DbActionTypes.GET_BY, async () => {
        const collection = uniqueString();
        const obj = {
            msg1: "hello",
            msg2: "hello1"
        };
        const _id = await BaseDao.create(collection, obj);
        const result = await factory(collection, DbActionTypes.GET_BY, {_id});
        expect(result).eql({...obj, _id});
    });
    describe(DbActionTypes.UPDATE_BY_ID, () => {
        it("no _id provided", async () => {
            const col = uniqueString();
            const result = await factory(col, DbActionTypes.UPDATE_BY_ID, {});
            expect(result).equal("No id provided");
        });
        it("_id provided", async () => {
            const col = uniqueString();
            const obj = {
                msg1: "hello",
                msg2: "hello1"
            };
            const newMsg1 = "asdfasdf";
            const _id = await BaseDao.create(col, obj);
            const result = await factory(col, DbActionTypes.UPDATE_BY_ID, {_id, msg1: newMsg1});
            expect(result).eql({...obj, _id, msg1: newMsg1});
        });
    });
    it(DbActionTypes.GET_ALL, async () => {
        const col = uniqueString();
        const obj = {hello: "world", msg1: "cheese"};
        const id1 = await BaseDao.create(col, obj);
        const id2 = await BaseDao.create(col, obj);
        const id3 = await BaseDao.create(col, obj);
        const objs = await factory(col, DbActionTypes.GET_ALL);
        expect(objs).eql([
            {...obj, _id: id1},
            {...obj, _id: id2},
            {...obj, _id: id3}
        ]);

    });
    const bad = "bad query";
    it(bad, async () => {
        const collection = uniqueString();
        const result = await factory(collection, bad);
        expect(result).equal(`${bad} not implemented yet`);
    });
    it("only collection", async () => {
        const collection = uniqueString();
        const result = await factory(collection);
        expect(result).equal(`undefined not implemented yet`);
    });
});
