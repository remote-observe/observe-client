const {db} = require('../firebase.js');

async function getObservatory(name) {
  return db()
    .collection('observatories')
    .where('name', '==', name)
    .get()
    .then(doc => doc.docs[0]);
}

exports.getObservatoryRef = function getObservatoryRef(name) {
  return db()
    .collection('observatories')
    .where('name', '==', name)
};

exports.getObservatoryCommands = async function getObservatoryCommands(name) {
  const obs = await getObservatory(name);
  return obs.data().commands;
}

exports.updateCommand = async function(observatory, commandId, command) {
  const obs = await getObservatory(observatory);

  return db()
    .collection('observatories')
    .doc(obs.id)
    .update({
      [`commands.${commandId}`]: command
    });
}

exports.updateObservatory = async function updateObservatory(name, data) {
  const obs = await getObservatory(name);

  return db()
    .collection('observatories')
    .doc(obs.id)
    .update(data);
}
