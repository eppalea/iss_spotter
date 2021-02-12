const { fetchMyIP, fetchCoordsByIP } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     // console.log("It didn't work!", error);
//     return;
//   }
//   // console.log("It worked! Returned IP: ", ip);
// });

fetchCoordsByIP(`206.116.211.111`, (error, latLong) => {
  if (error) {
    console.log("Sorry, no dice", error);
    return;
  }
  console.log("Good job! You've outputted lat & long: ", latLong);
});