import React, { useState, useEffect, useRef } from "react";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const formRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");


  //Fetch all the products
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  const handleSubmit = async (form) => {
    if (editProduct) {
      await fetch(`http://localhost:5000/api/products/${editProduct._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      alert("✅ Product updated!");
    } else {
      await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      alert("✅ Product added!");
    }

    setEditProduct(null);
    const res = await fetch("http://localhost:5000/api/products");
    setProducts(await res.json());
  };
    const filteredAndSortedProducts = products
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
        if (sortOption === "name") return a.name.localeCompare(b.name);
        if (sortOption === "priceLow") return a.price - b.price;
        if (sortOption === "priceHigh") return b.price - a.price;
        return 0;
    });

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    await fetch(`http://localhost:5000/api/products/${id}`, { method: "DELETE" });
    setProducts(products.filter((p) => p._id !== id));
    alert("🗑️ Product deleted!");
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    formRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleCancelEdit = () => setEditProduct(null);

  return (
    <div>
    <div className="container">
    <div className="form-wrapper" ref={formRef}>
        <h2>{editProduct ? "Edit Product" : "Add Product"}</h2>
        <ProductForm 
        onSubmit={handleSubmit} 
        editProduct={editProduct} 
        onCancelEdit={handleCancelEdit} 
        />
    </div>
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
     </div>
    <h2>Products</h2>
    <div className="product-grid">
        {filteredAndSortedProducts.map((p) => (
        <ProductCard key={p._id} product={p} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
    </div>
    </div>


  );
};

export default ProductList;
