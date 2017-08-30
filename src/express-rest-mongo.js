import express from "express";
import bodyParser from "body-parser";
import HttpStatus from "http-status-codes";
import "babel-polyfill";

import defaults from "./constants/defaults";
import MongoConnectionManager from "./database/mongo-connection-manager";
import factory from "./factory";
import router from "./routes/routes";

class ExpressRestMongo {
    constructor(config) {
        if (!config.port) {
            console.log(`RUNNING ON PORT ${defaults.expressPort} SINCE PORT WAS NOT PROVIDED`);
        }
        this.port = config.port || defaults.expressPort;

        if (!config.db) {
            throw new Error("db required");
        }

        this.db = config.db;

        if (!config.mongoPort) {
            console.log(`CONNECTING TO PORT ${defaults.mongoPort} FOR MONGO SINCE NONE SPECIFIED`);
        }
        this.mongoPort = config.mongoPort || defaults.mongoPort;

        if (!config.mongoIp) {
            console.log(`SETTING MONGO IP TO ${defaults.mongoIp} SINCE NONE PROVIDED`);
        }
        this.mongoIp = config.mongoIp || defaults.mongoIp;

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
