const private_key = require("../employee-aa34e-firebase-adminsdk-5bfga-04a50c83c0.json");
var fcm = require("fcm-notification");
var FCM = new fcm(private_key);
const token =
  "fGjYVXLsSsuSKmglAmj3er:APA91bHKfp8IRDpQF-vCu4tkdM69Quv4J47MJNN86LAQt48fA4ha_jriSOU_CY3n6IzP5C3QturveOvUo99oN5o4lgWOMVObc7rJgM-LHKsWLf7Cnqaa57vtlPXG_a2qFGUhPiCV3bFt";
const message = {
  data: {
    score: "850",
    time: "2:45",
  },
  notification: {
    title: "Title of notification",
    body: "Body of notification",
  },
  token: token,
};

const fcm_push = () => {
  FCM.send(message, function (err, response) {
    if (err) {
      console.log("error found", err);
    } else {
      console.log("response here__________", response);
    }
  });
};
module.exports = fcm_push;
