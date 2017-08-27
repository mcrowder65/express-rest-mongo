# express-rest-mongo

Express setup with Mongo that has OAuth Authentication <br>
built in with custom User endpoints. Run your server and it will automatically<br>
create your collections for you when you desire

To use this, install it, run a mongo server on any port and import it like so,
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

Example:
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
