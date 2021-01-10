const { db } = require('./admin')

// Add Order
exports.addItem = async (req, res) => {
  let session = await getSession(req, res)
  console.log(session)
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
