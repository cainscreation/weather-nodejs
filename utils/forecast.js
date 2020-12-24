const request = require("request");

const forecast = (address, callback) => {
  const URL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    address +
    "&appid=c473e59703694a4b6d8e2af44e521dfa&units=metric&lang=en";
  request({ url: URL, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (response.body.message) {
        console.log(response.body.message,undefined);
    } else {
        callback(undefined,{tempature:response.body.main.temp})
    }
  });
};

module.exports = forecast;
