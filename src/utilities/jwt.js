import jsonwebtoken from "jsonwebtoken";

const SECRET = "\x1f\x1e1\x8a\x8djO\x9e\xe4\xcb\x9d`\x13\x02\xfb+\xbb\x89q\"F\x8a\xe0a";

const jwt = {
    generateToken: (username, _id) => {
        return jsonwebtoken.sign({
            username,
            _id
        }, SECRET);
    },
    verifyToken: token => {
        return new Promise((resolve, reject) => {
            jsonwebtoken.verify(token, SECRET, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        });
    }
};

export default jwt;
