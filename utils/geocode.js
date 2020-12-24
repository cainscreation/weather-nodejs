const request = require("request");

const geocode = (address, callback) => {
  const URL =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    address +
    '.json?types=country&access_token=pk.eyJ1IjoiaGcyNzE5OTkiLCJhIjoiY2tpend6NnpkMmxyczJ4c2NtYzFhZmdiZiJ9.cG_rzaQcuxC1p8PimL7xTQ';

  request({ url: URL, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (response.body.features.length === 0) {
      callback("unable to find location,try other location", undefined);
      console.log(URL)
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[0],
        longitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
