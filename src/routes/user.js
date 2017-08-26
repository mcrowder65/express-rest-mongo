const user = {
    getUser: (req, res) => {

        res.send({
            body: req.body,
            params: req.params,
            query: req.query
        });

    }
};

export default user;
