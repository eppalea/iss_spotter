const request = require('request');

const fetchMyIP = function(callback) {
  request("https://api.ipify.org?format=json", (error, response, body) => {
    // console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the domain.
    if (error) {
      callback("Sorry, your request has failed.", null);
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
    } else {
      const ip = JSON.parse(body).ip;
      console.log(ip);
      callback(null, ip);
    }
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    //  console.log('body:', body); // Print the HTML for the domain.
    if (error) {
      callback("Sorry, so sad too bad.", null);
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
    } else {
      const { latitude, longitude } = JSON.parse(body);
      callback(null, { latitude, longitude });
    }
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };