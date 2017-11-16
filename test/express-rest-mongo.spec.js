import ExpressRestMongo from "../src/express-rest-mongo";

describe("test/express-rest-mongo.spec.js", () => {
    test("run!", () => {
        const app = new ExpressRestMongo({
            port: 3000,
            db: "tempDb",
            mongoPort: 27017
        });
        app.run();
        app.stop();
    });
});
