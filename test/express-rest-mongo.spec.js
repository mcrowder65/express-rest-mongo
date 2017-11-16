import uniqueString from "unique-string";
import fetch from "node-fetch";

import ExpressRestMongo from "../src/express-rest-mongo";
import DbActionTypes from "../src/constants/db-action-types";

describe("test/express-rest-mongo.spec.js", () => {
    describe("random coverage tests", () => {
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
    });
    describe("edge cases", () => {
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
    describe("full fledge!", () => {
        test("first", async () => {
            const app = new ExpressRestMongo({
                port: 3000,
                db: uniqueString(),
                mongoPort: 27017
            });
            app.run();
            const collection = uniqueString();
            const object = {
                hello: "world!",
                goodbye: "pickles!"
            };
            //TODO create a wrapper
            const res = await fetch(`http://localhost:3000/${collection}/${DbActionTypes.CREATE}`, {
                method: "POST",
                body: JSON.stringify(object),
                headers: {"Content-Type": "application/json", "Accept": "application/json"}
            });
            const actual = await res.json();
            expect(actual).toEqual({...object, _id: actual._id});
            app.stop();

        });
    });
});
