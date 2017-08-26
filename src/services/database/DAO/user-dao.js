import SqlConnectionManager from "../sql-connection-manager";

const tableName = "users";
const columns = [
    "id",
    "username",
    "password"
];

const UserDao = {
    getAll: () => {
        const connection = SqlConnectionManager.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`select ?? from ${tableName}`, columns, (error, results) => {
                if (error) {
                    reject();
                } else {
                    resolve(results);
                }
            });
        });
    },
    getBy: obj => {
        const connection = SqlConnectionManager.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`select ?? from ${tableName} where ?`,
                [columns, obj], (error, results) => {
                    if (error) {
                        reject();
                    } else if (results.length === 0) {
                        resolve(null);
                    } else if (results.length > 1) {
                        resolve(results);
                    } else if (results.length === 1) {
                        resolve(results[0]);
                    }
                });
        });
    },
    create: obj => {
        const connection = SqlConnectionManager.getConnection();
        return new Promise((resolve, reject) => {
            //TODO change to jwt
            connection.query(`INSERT INTO ${tableName} SET ?`, obj, error => {
                if (error) {
                    reject();
                } else {
                    resolve();
                }

            });
        });
    }
};

export default UserDao;
