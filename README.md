# express-rest-mongo
[![NPM version][npm-image]][npm-url] 
[![Build Status][travis-image]][travis-url]

Express setup with Mongo that has basic authentication
built in with custom User endpoints. Exposes a mongo database as a rest api.
Define your server port number, your mongo port number, your mongo database 
(which is generated dynamically if needed), and custom routes.

```
const ExpressRestMongo = require("express-rest-mongo");
const app = new ExpressRestMongo.default({
    port: 3000,
    mongoPort: 27017,
    db: "tempDb"
});
   
app.run();
```


And, voila! You now have an app running on port 3000 with a full fledge database with basic CRUD endpoints setup
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

Config options: 
- port: The port your express server will run on, default 3000
- db: The MongoDB database you will be reading/writing (required) 
- mongoPort: The port of in which mongod is running on, default: 27017
- mongoIp: The ip address of your mongo instance, default: 127.0.0.1
- customRoutes: The custom routes you desire to create
- collections: Array of strings which limits which collections can be read/written to, default: []<br>
To add custom routes, you can define a router and then import it in your config object as customRoutes

Example (with ES6), see the example folder for the code:
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


[npm-image]: https://badge.fury.io/js/express-rest-mongo.svg
[npm-url]: https://npmjs.org/package/express-rest-mongo

[travis-image]: https://travis-ci.org/mcrowder65/express-rest-mongo.svg?branch=rm
[travis-url]: https://travis-ci.org/mcrowder65/express-rest-mongo