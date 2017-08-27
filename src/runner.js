import ExpressRestMongo from "./express-rest-mongo";

const app = new ExpressRestMongo({
    port: 3000,
    db: "tempDb",
    mongoPort: 27017
});

app.run();
