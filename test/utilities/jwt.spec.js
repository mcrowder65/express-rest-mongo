import jwt from "../../src/utilities/jwt";

describe("test/utilities/jwt.spec.js", () => {
    test("generateToken then verify it", async () => {
        const username = "hello";
        const _id = "world";
        const token = jwt.generateToken(username, _id);
        const decodedToken = await jwt.verifyToken(token);
        expect(decodedToken.username).toEqual(username);
        expect(decodedToken._id).toEqual(_id);
    });
    test("generateToken with null params then verify it", async () => {
        const username = null;
        const _id = null;
        const token = jwt.generateToken(username, _id);
        const decodedToken = await jwt.verifyToken(token);
        expect(decodedToken.username).toEqual(username);
        expect(decodedToken._id).toEqual(_id);
    });
    test("generateToken with null param then verify it", async () => {
        const username = null;
        const _id = "hi!";
        const token = jwt.generateToken(username, _id);
        const decodedToken = await jwt.verifyToken(token);
        expect(decodedToken.username).toEqual(username);
        expect(decodedToken._id).toEqual(_id);
    });
    test("generateToken with undefined params then verify it", async () => {
        const username = undefined;
        const _id = undefined;
        const token = jwt.generateToken(username, _id);
        const decodedToken = await jwt.verifyToken(token);
        expect(decodedToken.username).toEqual(username);
        expect(decodedToken._id).toEqual(_id);
    });
    test("generateToken with undefined param then verify it", async () => {
        const username = undefined;
        const _id = "hi!";
        const token = jwt.generateToken(username, _id);
        const decodedToken = await jwt.verifyToken(token);
        expect(decodedToken.username).toEqual(username);
        expect(decodedToken._id).toEqual(_id);
    });
    test("generateToken with number params then verify it", async () => {
        const username = 1234;
        const _id = 444;
        const token = jwt.generateToken(username, _id);
        const decodedToken = await jwt.verifyToken(token);
        expect(decodedToken.username).toEqual(username);
        expect(decodedToken._id).toEqual(_id);
    });
    test("try to verify a bad token", async () => {
        try {
            await jwt.verifyToken("asdf");
            // if this runs then the function didn't reject properly
            expect(true).toEqual(false);
        } catch (e) {
            expect(e.message).toEqual("jwt malformed");
        }
    });
});
