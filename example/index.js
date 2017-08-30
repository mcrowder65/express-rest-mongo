import ExpressRestMongo from "../src/express-rest-mongo";

import CustomRoutes from "./custom-routes";


const app = new ExpressRestMongo({
    port: 3000,
    db: "tempDb",
    mongoPort: 27017,
    customRoutes: CustomRoutes,
    collections: ["users", "companies", "employees"]
});

app.run();
