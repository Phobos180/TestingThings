var errorSaveTimer = null;
var reconnectInterval = 3000; // 3 seconds
var saveErrorInterval = 18000; // 30 seconds
var counter = 0;
var Delaycalled = false;

var rabbitMQ = function () {
  let api = {};
  var t = process.hrtime();
  var client = "error";
  counter++;
  console.log("Numero di volte che siamo partiti " + counter);

  // Clear the error interval if needed
  function clearErrorInterval() {
    if (errorSaveTimer !== null) {
      clearInterval(errorSaveTimer);
      errorSaveTimer = null;
    }
  }

  function getHourMinutesSeconds() {
    let now = new Date(); // Create a new Date object with the current date and time
    let hour = now.getHours(); // Get the current hour
    let minute = now.getMinutes(); // Get the current minute
    let seconds = now.getSeconds(); //Get the current secodns
    let hourminute = hour + ":" + minute + ":" + seconds;

    return hourminute;
  }

  function startProcessTimer() {
    const startTime = process.hrtime(); // Start the timer
  }

  function stopProcessTimer(startTime) {
    const endTime = process.hrtime(startTime); // Stop the timer
    const elapsedTime = (endTime[0] * 1e9 + endTime[1]) / 1e6; //

    return elapsedTime;
  }

  function setDelayedDBWrapper() {
    // Write to the database every 3 minutes if the error persists
    if (errorSaveTimer) {
      errorSaveTimer = setInterval(function () {
        saveErrorOnWrapper("errore conn: " + "//" + getHourMinutesSeconds());
        console.log(
          "Delayed Savings after first table log: " + getHourMinutesSeconds()
        );
      }, saveErrorInterval);
      Delaycalled = true;
    }
  }

  // Save the error using dbWrapper.saveError() function
  function saveErrorOnWrapper(errMsg) {
    console.log(errMsg);
  }

  switch (client) {
    case "connected":
      clearErrorInterval();
      console.log("connecteddd");
      // code block
      break;
    case "heartbeat":
      // code block
      break;
    case "error":
      if (errorSaveTimer === null) {
        errorSaveTimer = true;

        saveErrorOnWrapper("errore conn: " + "//" + getHourMinutesSeconds());
        console.log("First save error on table: " + getHourMinutesSeconds());
      }

      if (!Delaycalled) {
        setDelayedDBWrapper();
      }

      // Retry connection to the rabbit queue every 30 seconds
      setTimeout(function () {
        console.log(process.hrtime(t));
        rabbitMQ();

        console.log("Restarting function");
      }, reconnectInterval);

      break;
    case "disconnected":
      saveErrorOnWrapper("errore: " + "//" + getHourMinutesSeconds());
      break;
    default:
    // code block
  }

  return api;
};

module.exports = rabbitMQ;
