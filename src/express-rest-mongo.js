import express from "express";
import bodyParser from "body-parser";
import HttpStatus from "http-status-codes";
import path from "path";
import "babel-polyfill";

import constants from "./constants";
import defaults from "./constants/config-defaults";
import MongoConnectionManager from "./database/mongo-connection-manager";
import factory from "./factory";
import router from "./routes/routes";

/*global console*/

/*eslint-disable no-console*/

class ExpressRestMongo {
    //eslint-disable-next-line
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
        this.collections = config.collections || [];
        //TODO add html config location to documentation
        this.indexFile = config.indexFile;
        this.buildFolder = config.buildFolder;
        this.app = null;
        this.server = null;
    }

    run() {
        this.app = express();

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        if (this.customRoutes) {
            this.app.use(this.customRoutes);
        }
        /*global __dirname: true*/
        this.app.use(express.static(path.resolve(__dirname, "../../..", "build")));

        this.app.get("*", (req, res) => {
            res.sendFile(path.resolve(__dirname, "../../..", "build", "index.html"));
        });
        this.app.use(router);
        MongoConnectionManager.setUrl(this.mongoPort, this.db, this.mongoIp);

        this.app.post("*", async (req, res) => {
            try {
                const arr = req.originalUrl.split("/").filter(e => e !== "");
                if (arr.length !== constants.AMOUNT_OF_PARAMS) {
                    throw new Error(
                        `Invalid request, need ${constants.AMOUNT_OF_PARAMS} parts in request`);
                }
                const collection = arr[0];
                if (this.collections.length > 0 && this.collections.indexOf(collection) === -1) {
                    throw new Error(`${collection} is not in the list of collections`);
                }
                const action = arr[1];
                const result = await factory(collection, action, req.body);
                res.send(result);
            } catch (error) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
            }
        });


        const {port} = this;
        // return new Promise(resolve => {
        this.server = this.app.listen(port);
    }

    stop() {
        this.server.close();
    }
}

export default ExpressRestMongo;
