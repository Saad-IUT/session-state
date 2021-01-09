const app = require('express')()
const jsonParser = require('body-parser').json()

const { addItem } = require('./cart')
const sessionId = require('./sessionId')

app.use(jsonParser)

// Cart routes
app.post('/cart/add/:item', sessionId, addItem)
// app.delete('/cart/remove/:item', removeItem)
// app.delete('/cart/decrease/:item', decreaseItem)
// app.get('/cart', getCart)

//Testing
app.get('/', (req, res) => {
  res.send('OK')
})
let port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Running on port ${port}`)
})
