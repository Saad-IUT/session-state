const { db } = require('./admin')
const file = require('./sessionId.json')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')

// Add Item
exports.addItem = async (req, res) => {
  let sessionId
  sessionId = file['session-id']
  if (sessionId) {
    req.headers['session-id'] = sessionId
  } else {
    sessionId = uuidv4()
    res.setHeader('session-id', sessionId)
    fs.writeFileSync('sessionId.json', `{"session-id":"${sessionId}"}`, err => {
      if (err) return err
      console.log('Saved!')
    })
  }
  const sessionRef = db.doc(`sessions/${sessionId}`)
  sessionRef
    .get()
    .then(doc => {
      //new session
      if (!doc.exists) {
        return sessionRef.set({ [req.params.item]: 1 })
      }
      // old session old item
      if (doc.data()[req.params.item]) {
        return sessionRef.update({
          [req.params.item]: doc.data()[req.params.item] + 1,
        })
      }
      // old session new item
      sessionRef.update({
        [req.params.item]: 1,
      })
      return res.status(201).json({ message: 'Item added successfully' })
    })
    .catch(err => {
      console.error(err)
    })
}

