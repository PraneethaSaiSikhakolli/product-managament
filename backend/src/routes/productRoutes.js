const express = require("express");
const router = express.Router();
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.get("/", getProducts);         // GET all
router.post("/", createProduct);      // CREATE new
router.put("/:id", updateProduct);    // UPDATE existing
router.delete("/:id", deleteProduct); // DELETE by id

module.exports = router;
