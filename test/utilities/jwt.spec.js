import jwt from "../../src/utilities/jwt";

describe("test/utilities/jwt.spec.js", () => {
    it("generateToken then verify it", async () => {
        const username = "hello";
        const _id = "world";
        const token = jwt.generateToken(username, _id);
        const decodedToken = await jwt.verifyToken(token);
        expect(decodedToken.username).equal(username);
        expect(decodedToken._id).equal(_id);
    });
    it("generateToken with null params then verify it", async () => {
        const username = null;
        const _id = null;
        const token = jwt.generateToken(username, _id);
        const decodedToken = await jwt.verifyToken(token);
        expect(decodedToken.username).equal(username);
        expect(decodedToken._id).equal(_id);
    });
    it("generateToken with null param then verify it", async () => {
        const username = null;
        const _id = "hi!";
        const token = jwt.generateToken(username, _id);
        const decodedToken = await jwt.verifyToken(token);
        expect(decodedToken.username).equal(username);
        expect(decodedToken._id).equal(_id);
    });
    it("generateToken with undefined params then verify it", async () => {
        const username = undefined;
        const _id = undefined;
        const token = jwt.generateToken(username, _id);
        const decodedToken = await jwt.verifyToken(token);
        expect(decodedToken.username).equal(username);
        expect(decodedToken._id).equal(_id);
    });
    it("generateToken with undefined param then verify it", async () => {
        const username = undefined;
        const _id = "hi!";
        const token = jwt.generateToken(username, _id);
        const decodedToken = await jwt.verifyToken(token);
        expect(decodedToken.username).equal(username);
        expect(decodedToken._id).equal(_id);
    });
    it("generateToken with number params then verify it", async () => {
        const username = 1234;
        const _id = 444;
        const token = jwt.generateToken(username, _id);
        const decodedToken = await jwt.verifyToken(token);
        expect(decodedToken.username).equal(username);
        expect(decodedToken._id).equal(_id);
    });
    it("try to verify a bad token", async () => {
        //eslint-disable-next-line
        expect(Promise.resolve(jwt.verifyToken("asdf"))).to.be.rejected;
    });
});
