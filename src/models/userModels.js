const pool = require("../dbConfiger");
const SQL_QURIES = require("../Quries");
const { createdJWtToken } = require("../middleWares");

const addUser = (req) => {
  const {
    empName = "rrrr",
    passWord = 0,
    empAge = 0,
    empSal = 0,
    empAddress = "",
    createdAt = new Date().getTime(),
    updatedAt = new Date().getTime(),
    isDeleted = 0,
    fcmToken = "",
  } = req.body;
  const params = [
    empName,
    passWord,
    empAge,
    empSal,
    empAddress,
    createdAt,
    updatedAt,
    isDeleted,
    fcmToken,
  ];
  return new Promise((resolve, reject) => {
    pool.query(SQL_QURIES.USERS.GET_EXISTING_USERS, params, (error, result) => {
      if (Boolean(result.length)) {
        reject({
          isError: true,
          statusCode: 401,
          error: `Already User Exists with ${empName} and ${passWord}`,
        });
        return;
      } else {
        pool.query(SQL_QURIES.USERS.INSERT, params, (error, result) => {
          if (error) {
            reject({
              isError: true,
              statusCode: 401,
              error: error.message || error,
            });
            return;
          }
          const token = createdJWtToken({ userId: result.insertId });
          updateUser(false, {
            body: {
              token: token,
              id: result.insertId,
            },
          });
          resolve({
            isError: false,
            statusCode: 200,
            massage: "successfully inserted",
            token: token,
          });
        });
      }
    });
  });
};

const getuser = () => {
  return new Promise((resolve, reject) => {
    pool.query(SQL_QURIES.USERS.GET_USERS, [], (error, result) => {
      if (error) {
        reject({
          isError: true,
          statusCode: 401,
          error: error.message || error,
        });
        return;
      }
      resolve({
        isError: false,
        statusCode: 200,
        result: result,
      });
    });
  });
};
const updateUser = (isAPI = true, req) => {
  const data = req.body;
  const userId = isAPI ? req.headers.usersData : data.id;
  return new Promise((resolve, reject) => {
    let SQL = "UPDATE employee SET ";
    let comma = false;
    let params = [];
    if (data.empName) {
      SQL += (comma ? "," : "") + "empName = ? ";
      params.push(data.empName);
      comma = true;
    }
    if (data.empAge) {
      SQL += (comma ? "," : "") + "empAge = ? ";
      params.push(data.empAge);
      comma = true;
    }
    if (data.empSal) {
      SQL += (comma ? "," : "") + "empSal = ? ";
      params.push(data.empSal);
      comma = true;
    }
    if (data.empAddress) {
      SQL += (comma ? "," : "") + "empAddress = ? ";
      params.push(data.empAddress);
      comma = true;
    }
    if (data.isDeleted) {
      SQL += (comma ? "," : "") + `isDeleted=?`;
      params.push(data.isDeleted);
      comma = true;
    }
    if (data.token) {
      SQL += (comma ? "," : "") + `token=?`;
      params.push(data.token);
      comma = true;
    }
    SQL += ` WHERE  id = ${userId}`;
    // console.log(SQL);
    // console.log(params);
    pool.query(SQL, params, (error, result) => {
      if (error) {
        reject({
          isError: true,
          statusCode: 401,
          error: error.message || error,
        });
        return;
      }
      resolve({
        isError: false,
        statusCode: 200,
        result: result,
      });
    });
  });
};
const getExistingUser = (req) => {
  const { empName = "rrrr", passWord = 0 } = req.body;
  const params = [empName, passWord];
  return new Promise((resolve, reject) => {
    pool.query(SQL_QURIES.USERS.GET_EXISTING_USERS, params, (error, result) => {
      if (!Boolean(result.length)) {
        reject({
          isError: true,
          statusCode: 401,
          error: ` ${empName} and ${passWord} this empName and passWord not found pleace signIn`,
        });
        return;
      }
      resolve({
        isError: false,
        statusCode: 200,
        massage: "successfully logIn",
        result: result,
      });
    });
  });
};
module.exports = {
  addUser,
  getuser,
  updateUser,
  getExistingUser,
};
