const { admin, db } = require('./admin')
const { v4: uuidv4 } = require('uuid')
let fs = require('fs')
const file = require('./sessionId.json')

module.exports = (req, res, next) => {
  let sessionId = file['session-id']
  if (sessionId) {
    res.send(sessionId)
  } else {
    res.setHeader('session-id', uuidv4())
    sessionId = res.getHeader('session-id')
    res.status(201).json({ message: 'New session created' })
  }
  fs.writeFile('sessionId.json', `{"session-id":"${sessionId}"}`, err => {
    if (err) return err
    console.log('Session-id saved in file!')
  })

  admin
    .then(sessionId => {
      console.log(sessionId)
      return db
        .collection('users')
        .where('userId', '==', req.user.uid)
        .limit(1)
        .get()
    })
    .then(data => {
      req.user.handle = data.docs[0].data().handle
      req.user.imageUrl = data.docs[0].data().imageUrl
      return next()
    })
    .catch(err => {
      console.error('Error while verifying session-id ', err)
      return res.status(403).json(err)
    })
}
