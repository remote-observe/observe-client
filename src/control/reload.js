const { getControllers } = require("./controllers");

let lastLoad = new Date();

exports.getStatus = async function() {
  return { lastLoad };
};

exports.executeCommand = async function(command) {
  console.log("Reloading controllers!");
  await getControllers(true);
  lastLoad = new Date();
};
