const { db } = require('./admin')

// Add Order
exports.addItem = (req, res) => {
  let currentSession = getSession(req, res)
  console.log(currentSession)
}

const getSession = (req, res) => {
  if (res.getHeader('session-id')) {
    return res.getHeader('session-id')
  } else if (req.headers['session-id']) {
    return req.headers['session-id']
  } else {
    console.error('Error while retrieving session')
  }
}

const validateSession = currentSession => {
  db.doc(`/sessions/${currentSession}`)
    .get()
    .then(doc => {
      return doc.exists
    })
}
