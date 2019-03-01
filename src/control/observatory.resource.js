const {db} = require('../firebase.js');

async function getObservatoryRef(name) {
  return db()
    .collection('observatories')
    .where('name', '==', name)
    .get()
    .then(doc => doc.docs[0]);
}

exports.getObservatoryRef = getObservatoryRef;

exports.getObservatoryCommands = async function getObservatoryCommands(name) {
  const obs = await getObservatoryRef(name);
  return obs.data().commands;
}

exports.updateCommand = async function(observatory, commandId, update) {
  const obs = await getObservatoryRef(observatory);

  return db()
    .collection('observatories')
    .doc(obs.id)
    .update({
      [`commands.${commandId}`]: command
    });
}

exports.updateObservatory = async function updateObservatory(name, data) {
  const obs = await getObservatoryRef(name);

  return db()
    .collection('observatories')
    .doc(obs.id)
    .update(data);
}
