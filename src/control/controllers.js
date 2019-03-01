const config = require("../config");

const defaultControllers = [
  {
    type: "reloader",
    path: "./reload"
  }
];

let controllers;

exports.getControllers = async function getControllers(reset = false) {
  if (controllers && !reset) return controllers;

  controllers = [];

  for (let controller of [
    ...defaultControllers,
    ...(config.controllers || [])
  ]) {
    controllers.push({
      type: controller.type,
      module: require(controller.path)
    });
  }

  return controllers;
};
