const { db } = require('./admin')
const { checkSession } = require('./validators')

// Add Product
exports.addItem = async (req, res) => {
  const product = req.body
  const valid = await checkSession(product.name)
  if (valid) {
    const newOrder = {
      name: product.name,
      categoryId: product.categoryId,
      categoryName: '',
      averageRating: null,
      numberOfRaters: 0,
    }
    db.collection('products')
      .add(newProduct)
      .then(() => {
        res.status(201).json({ message: 'Product added successfully' })
      })
      .catch(err => {
        res.status(500).json({ error: 'something went wrong' })
        console.error(err)
      })
  } else {
    return res.status(400).json({ productName: 'Duplicate' })
  }
}