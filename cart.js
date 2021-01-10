const { db } = require('./admin')

// Add Order
exports.addItem = async (req, res) => {
  let session = await getSession(req, res)
  console.log(session)
  db.doc(`sessions/${session}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        console.log('not found')
        return res.json({ message: 'not found' })
      }
      console.log('found')
      return res.json({ message: 'found' })
    })
    .catch(err => {
      console.error(err)
    })
}
exports.postOneScream = (req, res) => {
  const newScream = {
    createdAt: new Date().toISOString(),
    likeCount: 0,
    commentCount: 0,
  }

  db.collection('screams')
    .add(newScream)
    .then(doc => {
      const resScream = newScream
      resScream.screamId = doc.id
      res.json(resScream)
    })
    .catch(err => {
      res.status(500).json({ error: 'something went wrong' })
      console.error(err)
    })
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
