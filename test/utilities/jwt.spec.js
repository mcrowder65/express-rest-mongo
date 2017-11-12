import jwt from "../../src/utilities/jwt";

describe("test/utilities/jwt.spec.js", () => {
    it("generateToken then verify it", async () => {
        const username = "hello";
        const _id = "world";
        const token = jwt.generateToken("hello", "world");
        const decodedToken = await jwt.verifyToken(token);
        expect(decodedToken.username).equal(username);
        expect(decodedToken._id).equal(_id);
    });
    it("try to verify a bad token", async () => {
        expect(Promise.resolve(jwt.verifyToken("asdf"))).to.be.rejected;
    });
});
