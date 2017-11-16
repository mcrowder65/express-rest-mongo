import uniqueString from "unique-string";

import factory from "../src/factory";
import DbActionTypes from "../src/constants/db-action-types";
import MongoConnectionManager from "../src/database/mongo-connection-manager";
import configDefaults from "../src/constants/config-defaults";
import BaseDao from "../src/database/DAO/base-dao";

describe("test/factory.spec.js", () => {
    beforeAll(() => {
        MongoConnectionManager.setUrl(configDefaults.mongoPort, "mydb", configDefaults.mongoIp);
    });
    test(DbActionTypes.CREATE, async () => {
        const collection = uniqueString();
        const msg1 = "world";
        const msg2 = "cheese";
        const obj = {msg1, msg2};
        const result = await factory(collection, DbActionTypes.CREATE, obj);
        expect({msg1: result.msg1, msg2: result.msg2}).toEqual(obj);
    });
    describe(DbActionTypes.REMOVE_BY_ID, () => {
        test("no id provided", async () => {
            const collection = uniqueString();
            const result = await factory(collection, DbActionTypes.REMOVE_BY_ID, {});
            expect(result).toEqual("No id provided");
        });
        test("delete by id", async () => {
            const collection = uniqueString();
            const obj = {
                msg1: "hello",
                msg2: "hello2"
            };
            const _id = await BaseDao.create(collection, obj);
            const result = await factory(collection, DbActionTypes.REMOVE_BY_ID, {_id});
            expect(result).toEqual({message: "deleted!"});
        });
    });
    test(DbActionTypes.GET_BY, async () => {
        const collection = uniqueString();
        const obj = {
            msg1: "hello",
            msg2: "hello1"
        };
        const _id = await BaseDao.create(collection, obj);
        const result = await factory(collection, DbActionTypes.GET_BY, {_id});
        expect(result).toEqual({...obj, _id});
    });
    describe(DbActionTypes.UPDATE_BY_ID, () => {
        test("no _id provided", async () => {
            const col = uniqueString();
            const result = await factory(col, DbActionTypes.UPDATE_BY_ID, {});
            expect(result).toEqual("No id provided");
        });
        test("_id provided", async () => {
            const col = uniqueString();
            const obj = {
                msg1: "hello",
                msg2: "hello1"
            };
            const newMsg1 = "asdfasdf";
            const _id = await BaseDao.create(col, obj);
            const result = await factory(col, DbActionTypes.UPDATE_BY_ID, {_id, msg1: newMsg1});
            expect(result).toEqual({...obj, _id, msg1: newMsg1});
        });
    });
    test(DbActionTypes.GET_ALL, async () => {
        const col = uniqueString();
        const obj = {hello: "world", msg1: "cheese"};
        const id1 = await BaseDao.create(col, obj);
        const id2 = await BaseDao.create(col, obj);
        const id3 = await BaseDao.create(col, obj);
        const objs = await factory(col, DbActionTypes.GET_ALL);
        expect(objs).toEqual([
            {...obj, _id: id1},
            {...obj, _id: id2},
            {...obj, _id: id3}
        ]);

    });
    const bad = "bad query";
    test(bad, async () => {
        const collection = uniqueString();
        const result = await factory(collection, bad);
        expect(result).toEqual(`${bad} not implemented yet`);
    });
    test("only collection", async () => {
        const collection = uniqueString();
        const result = await factory(collection);
        expect(result).toEqual(`undefined not implemented yet`);
    });
});
