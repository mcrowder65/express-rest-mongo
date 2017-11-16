import uniqueString from "unique-string";

import ExpressRestMongo from "../src/express-rest-mongo";

//this file is pretty much temporary and express-rest-mongo will be filled more thoroughly
//when other tests are written using it explicitly!
describe("test/express-rest-mongo.spec.js", () => {
    test("run with user defined arguments", () => {
        const app = new ExpressRestMongo({
            port: 3000,
            db: uniqueString(),
            mongoPort: 27017
        });
        app.run();
        app.stop();
        //no errors should happen
    });
    test("run with default arguments", () => {
        const app = new ExpressRestMongo({db: uniqueString()});
        app.run();
        app.stop();
        //no errors should happen
    });
    test("no db should throw", () => {
        try {
            //eslint-disable-next-line
            const app = new ExpressRestMongo({});
            expect(true).toEqual(false);
        } catch (e) {
            expect(e.message).toEqual("db required");
        }
    });
});
