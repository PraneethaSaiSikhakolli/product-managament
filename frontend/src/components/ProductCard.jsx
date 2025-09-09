import React from "react";

const ProductCard = ({ product, onDelete, onEdit }) => {
  return (
    <div className="card">
      <h3>{product.name}</h3>
      <p><b>Price:</b> ₹{product.price}</p>
      <p><b>Category:</b> {product.category}</p>
      <p>{product.description}</p>

      <div className="card-buttons">
        <button className="btn edit" onClick={() => onEdit(product)}>✏️ Edit</button>
        <button className="btn delete" onClick={() => onDelete(product._id)}>🗑️ Delete</button>
      </div>
    </div>
  );
};

export default ProductCard;
