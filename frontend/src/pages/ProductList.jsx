import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";
import "../App.css";

const API_URL = "https://product-managament-eidf.onrender.com/api/products";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  // Fetch products
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  const handleSubmit = async (form) => {
    if (editProduct) {
      await fetch(`${API_URL}/${editProduct._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      alert("✅ Product updated!");
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      alert("✅ Product added!");
    }

    setEditProduct(null);
    setShowModal(false);
    const res = await fetch(API_URL);
    setProducts(await res.json());
  };

  const filteredAndSortedProducts = products
    .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === "name") return a.name.localeCompare(b.name);
      if (sortOption === "priceLow") return a.price - b.price;
      if (sortOption === "priceHigh") return b.price - a.price;
      return 0;
    });

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setProducts(products.filter((p) => p._id !== id));
    alert("🗑️ Product deleted!");
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setShowModal(true);
  };

  return (
    <div className="page-container">
      <div className="top-bar">
        <div className="search-sort">
          <input
            type="text"
            placeholder="Search Products..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select onChange={(e) => setSortOption(e.target.value)}>
            <option value="">Sort by</option>
            <option value="name">Name</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
          </select>
        </div>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          + Add Product
        </button>
      </div>

      <h2 className="section-title">Products</h2>
      <div className="product-grid">
        {filteredAndSortedProducts.map((p) => (
          <ProductCard
            key={p._id}
            product={p}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editProduct ? "Edit Product" : "Add Product"}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <ProductForm
              onSubmit={handleSubmit}
              editProduct={editProduct}
              onCancelEdit={() => {
                setEditProduct(null);
                setShowModal(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
