import BaseDao from "../../../src/database/DAO/base-dao";
import MongoConnectionManager from "../../../src/database/mongo-connection-manager";
import uniqueString from "unique-string";
import configDefaults from "../../../src/constants/config-defaults";

/*eslint-disable max-nested-callbacks*/
/*eslint-disable no-unused-expressions*/
describe("test/database/DAO/base-dao.spec.js", () => {
    beforeAll(() => {
        MongoConnectionManager.setUrl(configDefaults.mongoPort, "mydb", configDefaults.mongoIp);
    });
    describe("standard", async () => {
        test("create and get", async () => {
            const obj = {hello: "world"};
            const collection = uniqueString();
            const _id = await BaseDao.create(collection, {...obj});
            const get = await BaseDao.getBy(collection, {_id});
            expect(get).toEqual({...obj, _id});
        });
        test("create and get and update", async () => {
            const obj = {hello: "world"};
            const collection = uniqueString();
            const _id = await BaseDao.create(collection, {...obj});
            const get = await BaseDao.getBy(collection, {_id});
            expect(get).toEqual({...obj, _id});
            const hello = "pickles";
            const result = await BaseDao.updateById(collection, {_id, hello});
            expect(result).toEqual({_id, hello});
        });
        test("create and get and update and delete", async () => {
            const obj = {hello: "world"};
            const collection = uniqueString();
            const _id = await BaseDao.create(collection, {...obj});
            const get = await BaseDao.getBy(collection, {_id});
            expect(get).toEqual({...obj, _id});
            const hello = "pickles";
            const result = await BaseDao.updateById(collection, {_id, hello});
            expect(result).toEqual({_id, hello});

            await BaseDao.removeById(collection, _id);

            const thisShouldBeEmpty = await BaseDao.getBy(collection, {_id});
            expect(thisShouldBeEmpty).toEqual({});
        });
        test("create two and getAll", async () => {
            const message = "This is a message!";
            const collection = uniqueString();

            const objOne = {message};
            const objTwo = {message};
            const _idOne = await BaseDao.create(collection, {...objOne});
            const _idTwo = await BaseDao.create(collection, {...objTwo});
            const objs = await BaseDao.getAll(collection, {message});
            expect(objs).toEqual([{...objOne, _id: _idOne}, {...objTwo, _id: _idTwo}]);

        });
        test("create two and getAll but ignore a field", async () => {
            const message = "This is a message!";
            const collection = uniqueString();
            const password = "this is my password!";
            const obj = {message, password};
            const _idOne = await BaseDao.create(collection, {...obj});
            const _idTwo = await BaseDao.create(collection, {...obj});
            const objs = await BaseDao.getAll(collection, {message}, {message});
            expect(objs).toEqual([
                {message: obj.message, _id: _idOne},
                {message: obj.message, _id: _idTwo}
            ]);

        });
        //eslint-disable-next-line
        test("create two and getAll but ignore a field, getAll by one field but ignore that field", async () => {
            const message = "This is a message!";
            const collection = uniqueString();
            const password = "this is my password!";
            const obj = {message, password};
            const _idOne = await BaseDao.create(collection, {...obj});
            const _idTwo = await BaseDao.create(collection, {...obj});
            const objs = await BaseDao.getAll(collection, {message}, {password});
            expect(objs).toEqual([
                {password: obj.password, _id: _idOne},
                {password: obj.password, _id: _idTwo}
            ]);

        });
        test("create three and getAll with no input", async () => {
            const message = "This is a message!";
            const collection = uniqueString();
            const password = "this is my password!";
            const obj = {message, password};
            const _idOne = await BaseDao.create(collection, {...obj});
            const _idTwo = await BaseDao.create(collection, {...obj});
            const _idThree = await BaseDao.create(collection, {...obj});
            const objs = await BaseDao.getAll(collection);
            expect(objs).toEqual([
                {...obj, _id: _idOne},
                {...obj, _id: _idTwo},
                {...obj, _id: _idThree}
            ]);

        });
        test("create three and getAll with an _id", async () => {
            const message = "This is a message!";
            const collection = uniqueString();
            const password = "this is my password!";
            const obj = {message, password};
            const _id = await BaseDao.create(collection, {...obj});
            await BaseDao.create(collection, {...obj});
            await BaseDao.create(collection, {...obj});
            const objs = await BaseDao.getAll(collection, {_id});
            expect(objs).toEqual([
                {...obj, _id}
            ]);
        });
        test("empty getAll", async () => {
            const collection = uniqueString();
            const objs = await BaseDao.getAll(collection);
            expect(objs).toEqual([]);
        });
    });

});

