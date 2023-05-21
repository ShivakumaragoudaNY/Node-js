const jsonWebtoken = require("jsonwebtoken");

const SCT_KEY = "ADD ANY STRING TO CRETED AND VERIFY TOKEN";

const createdJWtToken = (payload) => {
  try {
    const token = jsonWebtoken.sign(payload, SCT_KEY, { algorithm: "HS256" });
    return token;
  } catch (err) {
    console.log("____Error while creating TOKEN");
  }
};

const verifyToken = (req, res, next) => {
  const bearerToken = req.headers["authorization"];
  const token = bearerToken?.split(" ")[1];
  if (!token) {
    res.sendStatus(401).json({
      isError: true,
      messag: "Invalid Token",
    });
    return;
  }
  try {
    jsonWebtoken.verify(token, SCT_KEY, (err, payload) => {
      if (!err) {
        req.headers.usersData = payload?.userId;
        next();
        return;
      }
      res.sendStatus(401).json({
        isError: true,
        messag: "Invalid Token",
      });
    });
  } catch (err) {}
};

module.exports = { createdJWtToken, verifyToken };
