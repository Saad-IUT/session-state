const { v4: uuidv4 } = require('uuid')
const file = require('./sessionId.json')
const fs = require('fs')

module.exports = (req, res, next) => {
  let sessionId
  sessionId = file['session-id']
  if (sessionId) {
    req.headers['session-id'] = sessionId
    res.status(200).json({ 'session-id': sessionId })
  } else {
    res.setHeader('session-id', uuidv4())
    sessionId = res.getHeader('session-id')
    res.status(201).json({ 'session-id': sessionId })
  }

  fs.writeFile('sessionId.json', `{"session-id":"${sessionId}"}`, err => {
    if (err) return err
    console.log('Saved!')
  })

  next()
}
