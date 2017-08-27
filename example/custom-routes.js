import express from "express";

const CustomRoutes = new express.Router();

CustomRoutes.route("/customers/create").post((req, res) => {
    res.send("This is a custom route!");
});
export default CustomRoutes;
