const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const schedule = require("node-schedule");
const fcm_push = require("./firebase/index");
//controller
const userController = require("../../employee/src/controllers/userControllers");
const app = express();

const corsOptions = {
  origin: "*",
  Credential: true,
  optionSuccessStatus: 200,
};

//return middeleware
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "1GB" }));
app.use(bodyParser.urlencoded({ extended: true }));

//ROUTE API
app.use("/api/users", userController);

//fcm_push();
const job = schedule.scheduleJob("*/5 * * * * *", () => {
  // console.log(
  //   "____________every_ 5_ sec_____________>",
  //   new Date().getSeconds()
  // );
});

app.listen(3001, () => {
  console.log("_____server running on port___>", 3001);
});

////////////////////////////
// var admin = require("firebase-admin");

// var serviceAccount = require("./employee-aa34e-firebase-adminsdk-5bfga-04a50c83c0.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });
////////////////////////////

module.exports = app;
