import mysql from "mysql";
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "services",
    port: "8889"
});

connection.connect();
const SqlConnectionManager = {
    getConnection: () => {
        return connection;
    },
    disconnect: () => {
        connection.end();
    }
};

export default SqlConnectionManager;
