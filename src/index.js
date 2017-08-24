import Hapi from "hapi";

const server = new Hapi.Server();
server.connection({
    host: "localhost",
    port: 8000
});

server.route({
    method: "POST",
    path: "/hello",
    handler: function (request, reply) {
        const {payload} = request;
        console.log(payload);
        reply({message: "hello!"});
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log("Server running at:", server.info.uri);
});