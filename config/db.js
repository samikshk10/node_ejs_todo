const {
    Pool
} = require("pg");
const getconnection = () => {
    const conn = new Pool({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        port: process.env.DBPORT
    });
    console.log("database connection");
    return conn;
};
module.exports = getconnection;