const request = require("request");
const { nextISSTimesForMyLocation } = require('./iss_promised');

const printPassTimes = function(nextPasses) {
  for (const pass of nextPasses) {
    // console.log('the pass is: ', pass);
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    // console.log("the datetime is: ", datetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("Sorry, no dice: ", error.message);
  });

