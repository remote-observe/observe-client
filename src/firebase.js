const admin = require('firebase-admin')

let _db

exports.setupFirebase = (firebaseConfigPath, firebaseConfigUrl) => {
  const serviceAccount = require(firebaseConfigPath)

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: firebaseConfigUrl
  })

  _db = admin.firestore()
  const settings = {}
  _db.settings(settings)
}

exports.db = () => _db
