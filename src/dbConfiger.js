const mysql = require("mysql");
const dbConfiger = {
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "SoftSuave@123",
  database: "softsuave",
};

const pool = mysql.createPool(dbConfiger);

pool.getConnection((error, result) => {
  if (error) {
    return new Error(error);
  }
  console.log("____CONNECTION ESTABLISHED________", dbConfiger);
});
module.exports = pool;
