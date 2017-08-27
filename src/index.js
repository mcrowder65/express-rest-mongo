import express from "express";
import bodyParser from "body-parser";
import HttpStatus from "http-status-codes";
// import "babel-polyfill";

import factory from "./factory";
import router from "./routes/routes";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(router);

const port = 3000;

app.post("*", async (req, res) => {
    try {
        const arr = req.originalUrl.split("/").filter(e => e !== "");
        const result = await factory(arr[0], arr[1], req.body);
        res.send(result);
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
});
app.listen(port, () => {
    /*eslint no-console: "off"*/
    /*global console: true*/
    console.log(`Server started on port ${port}`);
});
