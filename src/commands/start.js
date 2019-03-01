const path = require("path");
const {Command, flags} = require('@oclif/command');
const {setConfig} = require('../config');
const {setupFirebase} = require('../firebase');
const {start} = require('../control/dispatcher');

class StartCommand extends Command {
  async run() {
    const {flags} = this.parse(StartCommand)
    const configPath = path.resolve(process.cwd(), flags.config);
    this.log("Config path: " + configPath);

    const config = require(configPath);
    assertConfig(config);
    setConfig(config);
    setupFirebase(config.firebase.credentialsPath, config.firebase.url);
    setTimeout(start);
  }
}

function assertConfig(config) {
console.log(config);
  if (!config) throw new Error('Invalid config file!');
  if (!config.firebase) throw new Error('Config must contain firebase connection settings');
  if (!config.firebase.credentialsPath) throw new Error('Config must contain firebase credentials configuration');
  if (!config.firebase.url) throw new Error('Config must contian firebase URL');
}


StartCommand.description = `Start the client
Start the client
`

StartCommand.flags = {
  config: flags.string({char: 'c', description: 'Path to configuration file'}),
}

module.exports = StartCommand
