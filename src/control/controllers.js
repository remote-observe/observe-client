const config = require('../config')
const npm = require('npm')

function loadModule(module) {
  console.log(`NPM Installing module: ${module}`)

  return new Promise((resolve, reject) => {
    npm.load(
      {
        loaded: false
      },
      function(err) {
        if (err) return reject(err)

        npm.commands.install([`${module}@latest`], function(err, data) {
          if (err) reject(err)
          else resolve(require(module))
        })
        npm.on('log', function(message) {
          // log the progress of the installation
          // console.log(message);
        })
      }
    )
  })
}

const defaultControllers = [{ type: 'reloader', path: './reload' }]

let controllers

exports.getControllers = async function getControllers(reset = false) {
  if (controllers && !reset) return controllers
  controllers = loadControllers()
  return controllers
}

async function loadControllers() {
  const controllers = []

  for (let controller of [
    ...defaultControllers,
    ...(config.getConfig().controllers || [])
  ]) {
    console.log(`Loading controller: ${controller.type}`)

    if (!controller.path && !controller.url && !controller.module) {
      throw new Error('Controller must have a path, module, or url')
    }
    try {
      controllers.push({
        type: controller.type,
        module: controller.path
          ? require(controller.path)
          : await loadModule(controller.module)
      })
    } catch (error) {
      throw new Error(`Error loading controller: ${controller.type}`)
    }
  }

  return controllers
}
