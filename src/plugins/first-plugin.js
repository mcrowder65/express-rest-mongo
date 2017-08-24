export const temp = {
    method: "GET",
    path: "/temp",
    handler: (req, reply) => {
        const {payload} = req;
        console.log(payload);
        reply({message: "hello!"});
    }
};

