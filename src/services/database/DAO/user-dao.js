import SqlConnectionManager from "../sql-connection-manager";

const UserDao = {
    getAll: () => {
        const connection = SqlConnectionManager.getConnection();
        return new Promise((resolve, reject) => {
            connection.query("select * from users", (error, results) => {
                if (error) {
                    reject();
                } else {
                    resolve(results);
                }
            });
        });
    },
    getById: id => {
        const connection = SqlConnectionManager.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`select * from users where id = ${id}`, (error, results) => {
                if (error) {
                    reject();
                } else {
                    resolve(results);
                }
            });
        });
    }
};

export default UserDao;
