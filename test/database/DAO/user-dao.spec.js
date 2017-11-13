import UserDao from "../../../src/database/DAO/user-dao";
import BaseDao from "../../../src/database/DAO/base-dao";

describe("test/database/user-dao.spec.js", () => {
    it("create", async () => {
        const username = "hello";
        const password = "world";
        const _id = await UserDao.create(username, password);
        const user = await BaseDao.getBy("users", {username}, {username, _id});
        expect({username: user.username, _id: user._id}).eql({username, _id});
    });
});

