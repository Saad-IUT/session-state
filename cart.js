const { db } = require('./admin')
const { checkSession } = require('./validators')

// Add Order
exports.addItem = async (req, res) => {
  console.log(req)
  // const newOrder = {
  //   name: product.name,
  //   categoryId: product.categoryId,
  //   categoryName: '',
  //   averageRating: null,
  //   numberOfRaters: 0,
  // }
  // db.collection('sessions')
  //   .add(newOrder)
  //   .then(() => {
  //     res.status(201).json({ message: 'Product added successfully' })
  //   })
  //   .catch(err => {
  //     res.status(500).json({ error: 'something went wrong' })
  //     console.error(err)
  //   })
}
