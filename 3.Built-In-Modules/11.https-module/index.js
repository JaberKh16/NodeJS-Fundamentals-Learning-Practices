// using https module to make a request to an API and get the response data
const https = require("https");

const url =
  "https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/40,-75";

const request = https.request(url, (response) => {
  let data = "";
  response.on("data", (chunk) => {
    data = data + chunk.toString();
  });
  response.on("end", () => {
    const body = JSON.parse(data);
    console.log(body);
  });
});

request.on("error", (error) => {
  console.log("An error", error);
});
request.end();
