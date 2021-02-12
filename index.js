const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     // console.log("It didn't work!", error);
//     return;
//   }
//   // console.log("It worked! Returned IP: ", ip);
// });

// fetchCoordsByIP(`206.116.211.111`, (error, latLong) => {
//   if (error) {
//     console.log("Sorry, no dice", error);
//     return;
//   }
//   console.log("Good job! You've outputted lat & long: ", latLong);
// });
const myCoords = { latitude: 49.3678, longitude: -122.9278 };

fetchISSFlyOverTimes(myCoords, (error, data) => {
  if (error) {
    console.log("Sorry, no dice", error);
    return;
  }
  console.log("Good job! ISS is overhead during this window: ", data);
});