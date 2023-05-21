const SQL_QURIES = {
  USERS: {
    INSERT:
      "INSERT INTO employee(empName,passWord,empAge,empSal,empAddress,createdAt , updatedAt,isDeleted,fcmToken) VALUES(?,?,?,?,?,?,?,?,?)",
    GET_USERS: "SELECT * FROM employee where isDeleted =0",
    GET_EXISTING_USERS:
      "SELECT * FROM employee where empName =?  AND passWord=? ",
  },
};
module.exports = SQL_QURIES;
