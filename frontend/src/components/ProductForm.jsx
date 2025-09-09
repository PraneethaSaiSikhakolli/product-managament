import React, { useState, useEffect } from "react";

const ProductForm = ({ onSubmit, editProduct, onCancelEdit }) => {
  const [form, setForm] = useState({ name: "", price: "", description: "", category: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (editProduct) {
      setForm(editProduct);
    } else {
      setForm({ name: "", price: "", description: "", category: "" });
    }
  }, [editProduct]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.description || !form.category) {
      setError("⚠️ All fields are required");
      return;
    }

    setError("");
    onSubmit(form);
    setForm({ name: "", price: "", description: "", category: "" });
  };

  return (
    <div className="form-container">
    <form className="form" onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} />
      <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} />
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange}></textarea>

      <div className="form-buttons">
        <button type="submit" className="btn add">
          {editProduct ? "Update Product" : "Add Product"}
        </button>

        {editProduct && (
          <button type="button" className="btn cancel" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
    </div>
  );
};

export default ProductForm;
