const {getControllers} = require('./controllers');
exports.getStatus = async function() {
  return 'active'
}

exports.executeCommand = async function(command) {
  console.log('Reloading controllers!');
  return await getControllers(true);
}
