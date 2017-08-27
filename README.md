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

Next step is to add custom routing
