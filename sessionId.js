const { v4: uuidv4 } = require('uuid')
const file = require('./sessionId.json')
const fs = require('fs')

module.exports = (req, res, next) => {
  let sessionId
  sessionId = file['session-id']
  if (sessionId) {
    req.headers['session-id'] = sessionId
  } else {
    sessionId = uuidv4()
    res.setHeader('session-id', sessionId)
  }

  fs.writeFileSync('sessionId.json', `{"session-id":"${sessionId}"}`, err => {
    if (err) return err
    console.log('Saved!')
  })

  next()
}
