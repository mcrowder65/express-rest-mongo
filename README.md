# express-rest-mongo

Express setup with Mongo that has basic authentication <br>
built in with custom User endpoints. Exposes a mongo database as a rest api.<br>
Define your server port number, your mongo port number, your mongo database <br>
(which is generated dynamically if needed), and custom routes.

```
const ExpressRestMongo = require("express-rest-mongo/lib/express-rest-mongo");
const app = new ExpressRestMongo.default({
    port: 3000,
    mongoPort: 27017,
    db: "tempDb"
});
   
app.run();
```

And, voila! You now have an app running on port 3000 with a full fledge database with basic CRUD endpoints setup<br>
for any collection you desire! <br>

Supported endpoints:

- */getAll
- */getBy
- */create
- */updateById
- */removeById
- users/signin
- users/signup
- users/updateById

To add custom routes, you can define a router and then import it in your config object as customRoutes<br>

Example (with ES6), see the example folder for the code:<br>
index.js
```

import ExpressRestMongo from "../src/express-rest-mongo";

import CustomRoutes from "./custom-routes";

const app = new ExpressRestMongo({
    port: 3000,
    db: "tempDb",
    mongoPort: 27017,
    customRoutes: CustomRoutes
});

app.run();

```

custom-routes.js
```
import express from "express";

const CustomRoutes = new express.Router();

CustomRoutes.route("/customers/create").post((req, res) => {
    res.send("This is a custom route!");
});
export default CustomRoutes;
```

This also supports overriding endpoints as well! So if for some reason you don't like the users/signin or users/signup <br>
functionality, you can override it like so.

It's probably a good idea to override users/getAll so that it doesn't give all users to anyone who desires them.<br>
By default, all routes are posts, if you want to change that then override the routes
