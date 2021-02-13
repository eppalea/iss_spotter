// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

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
// const myCoords = { latitude: 49.3678, longitude: -122.9278 };

// fetchISSFlyOverTimes(myCoords, (error, data) => {
//   if (error) {
//     console.log("Sorry, no dice", error);
//     return;
//   }
//   console.log("Good job! ISS is overhead during this window: ", data);
// });

const { nextISSTimesForMyLocation } = require('./iss');



nextISSTimesForMyLocation((error, nextPasses) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  //success, prints out the details!
  // console.log('the next passes are: ', nextPasses);
  passTimeInfo(nextPasses);
});

const passTimeInfo = function(nextPasses) {
  for (const pass of nextPasses) {
    // console.log('the pass is: ', pass);
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    // console.log("the datetime is: ", datetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};