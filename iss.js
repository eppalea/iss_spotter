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
      // console.log("The IP is: ", ip);
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
      // console.log("The lat and long are: ", { latitude, longitude });
      callback(null, { latitude, longitude });
    }
  });
};


const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    // console.log('body:', body);
    if (error) {
      callback("Sorry, it's not working.", null);
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
    } else {
      const response = JSON.parse(body).response;
      callback(null, response);
    }
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback("Sorry, your request has failed.", null);
    }
    
    fetchCoordsByIP(ip, (error, myCoords) => {
      if (error) {
        return callback("Sorry, so sad too bad.", null);
      }
      
      fetchISSFlyOverTimes(myCoords, (error, nextPasses) => {
        if (error) {
          return callback("Sorry, it's not working.", null);
        }
        // console.log("the next passes are: ", nextPasses);
        callback(null, nextPasses);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };
// module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };