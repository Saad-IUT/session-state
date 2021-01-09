const { db } = require('./admin')
const { checkSession } = require('./validators')

// Add Order
exports.addItem = async (req, res) => {
  console.log(req.sessionId)
  const newOrder = {
    [req.params.item]: 1,
  }
  db.collection('sessions')
    .add(newOrder)
    .then(doc => {
      console.log(doc.id)
      res.setHeader('session-id', doc.id)
      console.log(res.header())
      res.status(201).json({ message: 'Product added successfully' })
    })
    .catch(err => {
      res.status(500).json({ error: 'something went wrong' })
      console.error(err)
    })
}
