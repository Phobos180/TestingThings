var errorSaveTimer = null;
var now = new Date(); // Create a new Date object with the current date and time
var hour = now.getHours(); // Get the current hour
var minute = now.getMinutes(); // Get the current minute
var seconds = now.getSeconds(); //Get the current secodns
var hourminute = hour + ":" + minute + ":" + seconds;
var reconnectInterval = 3000; // 3 seconds
var saveErrorInterval = 18000; // 30 seconds
var counter = 0;

var rabbitMQ = function () {
  let api = {};
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

  // Save the error using dbWrapper.saveError() function
  function saveErrorOnWrapper(errMsg) {
    console.log(errMsg);
  }

  switch (client) {
    case "connected":
      // code block
      break;
    case "heartbeat":
      // code block
      break;
    case "error":
      if (errorSaveTimer === null) {
        errorSaveTimer = true;

        saveErrorOnWrapper("errore conn: " + "//" + hourminute);
        console.log("First save error on table: " + hourminute);
      }

      // Retry connection to the rabbit queue every 30 seconds
      setTimeout(function () {
        rabbitMQ();
        console.log("Restarting function");
      }, reconnectInterval);

      // Write to the database every 3 minutes if the error persists
      if (errorSaveTimer) {
        errorSaveTimer = setInterval(function () {
          saveErrorOnWrapper("errore conn: " + "//" + hourminute);
          console.log("Delayed Savings after first table log: " + hourminute);
        }, saveErrorInterval);
      }

      break;
    case "disconnected":
      saveErrorOnWrapper("errore: " + "//" + hourminute);
      break;
    default:
    // code block
  }

  return api;
};

module.exports = rabbitMQ;
