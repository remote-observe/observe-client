const { getControllers } = require("./controllers.js");
const {
  updateObservatory,
  updateCommand,
  getObservatoryCommands
} = require("./observatory.resource.js");

const POLL_TIME = 3000;
let interval;

exports.start = function start() {
  interval = setInterval(() => {
    getStatus()
      .then(executeCommands)
      .catch(error => console.error("Error polling status", error));
  }, POLL_TIME);
};

exports.stop = function stop() {
  clearInterval(interval);
};

async function getStatus() {
  const observatoryStatus = {};

  for (let controller of await getControllers()) {
    try {
      observatoryStatus[controller.type] = await controller.module.getStatus();
    } catch (error) {
      console.error("Error polling status for controller", controller.type);
    }
  }

  return updateObservatory("rovor", { status: observatoryStatus });
}

async function executeCommands() {
  const commands = (await getObservatoryCommands("rovor")) || {};
  const controllers = await getControllers();

  for (let commandId in commands) {
    const command = commands[commandId];
    console.log("command: ", command);

    if (command.status === "sent") {
      try {
        const controller = controllers.find(
          controller => controller.type === command.type
        );
        if (controller) {
          controller.module
            .executeCommand(command)
            .then(resp =>
              updateCommand("rovor", commandId, {
                ...command,
                status: "complete"
              })
            )
            .catch(error =>
              updateCommand("rovor", commandId, {
                ...command,
                status: "error",
                errorMessage: error
              })
            );

          updateCommand("rovor", commandId, {
            ...command,
            status: "pending"
          });
        }
      } catch (error) {
        console.error("Error executing command: ", command, error);
      }
    }
  }
}
