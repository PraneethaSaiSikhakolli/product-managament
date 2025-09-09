const Product = require("../models/productModel");

// GET all products
exports.getProducts = async (req, res) => {
  try {
    let query = Product.find();

    // Optional: sort by price if query param provided
    if (req.query.sort === "price") query = query.sort({ price: 1 });

    const products = await query;
    res.json(products);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: err.message });
  }
};

// POST create new product
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    if (!name || !price || !description || !category) {
      return res
        .status(400)
        .json({ message: "All fields (name, price, description, category) are required" });
    }

    const product = new Product({ name, price, description, category });
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error creating product", error: err.message });
  }
};

// PUT update product by ID
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, category },
      { new: true, runValidators: true } // return updated doc + enforce schema
    );

    if (!updated)
      return res.status(404).json({ message: "Product not found" });

    res.json(updated);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error updating product", error: err.message });
  }
};

// DELETE product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted", product: deleted });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: err.message });
  }
};
