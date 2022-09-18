const Product = require("../model/productModel");
const asyncHandler = require("express-async-handler");

//fetch products
//GET /api/products
// public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

//fetch single product
//GET /api/products/:id
// public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).json({ message: "product not found!" });
  }
});

//delete product
//DELETE /api/products/:id
// private/admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.send({ message: "Product Removed" });
  } else {
    res.status(404).json({ message: "product not found!" });
  }
});

//create product
//POST /api/products/
// private/admin

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "name",
    price: 1,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "sample brand",
    category: "sample category",
    countInStock: 12,
    numReviews: 0,
    description: "xyz",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//update product
//PUT /api/products/:id
// private/admin

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, image, brand, category, countInStock, description } =
    req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.description = description;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404).json({ message: "product not found!" });
  }
});

module.exports = {
  getProductById,
  getProducts,
  deleteProduct,
  updateProduct,
  createProduct,
};
