import express from "express";
import bodyParser from "body-parser";
import HttpStatus from "http-status-codes";
import "babel-polyfill";

import MongoConnectionManager from "./database/mongo-connection-manager";
import factory from "./factory";
import router from "./routes/routes";
class ExpressRestMongo {
    constructor(config) {
        if (!config.port) {
            console.log("RUNNING ON PORT 3000 SINCE PORT WAS NOT PROVIDED");
        }
        const port = 3000;
        this.port = config.port || port;

        if (!config.db) {
            throw new Error("db required");
        }

        this.db = config.db;

        if (!config.mongoPort) {
            console.log("CONNECTING TO PORT 27017 FOR MONGO SINCE NONE SPECIFIED");
        }
        const defaultMongoPort = 27017;
        this.mongoPort = config.mongoPort || defaultMongoPort;

        if (!config.mongoIp) {
            console.log("SETTING MONGO IP TO 127.0.0.1 SINCE NONE PROVIDED");
        }
        this.mongoIp = config.mongoIp || "127.0.0.1";
        this.customRoutes = config.customRoutes;

    }

    run() {
        const app = express();

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        if (this.customRoutes) {
            app.use(this.customRoutes);
        }
        app.use(router);
        MongoConnectionManager.setUrl(this.mongoPort, this.db, this.mongoIp);
        app.post("*", async (req, res) => {
            try {
                const arr = req.originalUrl.split("/").filter(e => e !== "");
                const result = await factory(arr[0], arr[1], req.body);
                res.send(result);
            } catch (error) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
            }
        });
        const {port} = this;
        app.listen(port, () => {
            /*eslint no-console: "off"*/
            /*global console: true*/
            console.log(`Server started on port ${port}`);
        });
    }
}

export default ExpressRestMongo;
