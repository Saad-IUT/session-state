const { db } = require('./admin')
const { checkSession } = require('./validators')

// Add Order
exports.addItem = (req, res) => {
  let sessionId
  if (res.getHeader('session-id')) {
    sessionId = res.getHeader('session-id')
  } else if (req.headers['session-id']) {
    sessionId = req.headers['session-id']
  } else console.error('Error while retrieving session')
 
}
