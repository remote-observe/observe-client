const { getControllers } = require('./controllers.js')
const { isEqual } = require('lodash')
const config = require('../config')
const {
  updateObservatory,
  updateCommand,
  getObservatoryCommands,
  getObservatoryRef
} = require('./observatory.resource.js')

const POLL_TIME = 3000
let status
let interval

exports.start = function start() {
  getObservatoryRef('rovor').onSnapshot(() =>
    executeCommands().catch(error =>
      console.error('Error executing commands', error)
    )
  )

  interval = setTimeout(async function pollStatus() {
    try {
      await getStatus()
    } catch (error) {
      console.error('Error polling status', error)
    }
    interval = setTimeout(pollStatus, POLL_TIME)
  }, POLL_TIME)
}

exports.stop = function stop() {
  clearInterval(interval)
}

async function getStatus() {
  const observatoryStatus = {}

  for (let controller of await getControllers()) {
    if (controller.module.getStatus) {
      try {
        observatoryStatus[controller.type] = await controller.module.getStatus(
          getControllerConfig(controller.type)
        )
      } catch (error) {
        console.error('Error polling status for controller', controller.type)
        console.error(error)
      }
    }
  }

  if (isEqual(observatoryStatus, status)) return // don't update the status if it hasn't changed

  status = observatoryStatus

  return updateObservatory('rovor', {
    status: observatoryStatus,
    lastPing: new Date()
  })
}

async function executeCommands() {
  const commands = (await getObservatoryCommands('rovor')) || {}
  const controllers = await getControllers()

  for (let commandId in commands) {
    const command = commands[commandId]
    console.log('command: ', command)

    if (command.status === 'sent') {
      try {
        const controller = controllers.find(
          controller => controller.type === command.type
        )

        if (controller) {
          updateCommand('rovor', commandId, {
            ...command,
            status: 'pending'
          })

          controller.module
            .executeCommand(command, getControllerConfig(command.type))
            .then(resp =>
              updateCommand('rovor', commandId, {
                ...command,
                status: 'complete'
              })
            )
            .catch(error =>
              updateCommand('rovor', commandId, {
                ...command,
                status: 'error',
                data: {
                  errorMessage: error.message
                }
              })
            )
        }
      } catch (error) {
        console.error('Error executing command: ', command, error)
      }
    }
  }
}

function getControllerConfig(type) {
  const controllers = config.getConfig().controllers || []
  return controllers.find(controller => controller.type === type)
}
