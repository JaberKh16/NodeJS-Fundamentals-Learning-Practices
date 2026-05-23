const request = require("request");
const geocode = require("./utils/geocode");

const weatherAPIObject = {
  lat: 10.99,
  lon: 44.34,
  APIKEY: "cc41475aacac94089fd6568c26c3d8f7",
};
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${weatherAPIObject.lat}&lon=${weatherAPIObject.lon}&appid=${weatherAPIObject.APIKEY}`;

request({ url: url }, (error, response) => {
  if (error) {
    console.log(`unable to connect to the api`, error);
  }
  const data = JSON.parse(response.body);
  if (data.length === 0) {
    console.log("unable to find location. try another search.");
  }
  console.log(`${data}`);
});

// setup as json only
// request({ url: url, json: true }, (error, response) => {
//   console.log(
//     response.body.daily.data[0].summary +
//       " It is currently " +
//       response.body.currently.temperature +
//       " degrees out. There is a " +
//       response.body.currently.precipProbability +
//       "% chance of rain.",
//   );
// });

// geocode api call
geocode("Boston", (error, data) => {
  console.log("Error", error);
  console.log("Data", data);
});
