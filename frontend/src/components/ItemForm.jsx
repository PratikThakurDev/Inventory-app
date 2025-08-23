import React, { useState, useEffect } from "react";
import axios from "axios";

const ItemForm = ({ item, onSuccess, onCancel }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories");
        setCategories(res.data);
      } catch {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (item) {
      setName(item.name);
      setDescription(item.description || "");
      setQuantity(item.quantity);
      setPrice(item.price);
      setCategoryId(item.category_id);
      setImageUrl(item.image_url || "");
    } else {
      setName("");
      setDescription("");
      setQuantity(1);
      setPrice("");
      setCategoryId("");
      setImageUrl("");
    }
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      if (item) {
        await axios.put(`http://localhost:5000/api/items/${item.id}`, {
          name,
          description,
          quantity: Number(quantity),
          price: Number(price),
          category_id: Number(categoryId),
          image_url: imageUrl,
        });
      } else {
        await axios.post("http://localhost:5000/api/items", {
          name,
          description,
          quantity: Number(quantity),
          price: Number(price),
          category_id: Number(categoryId),
          image_url: imageUrl,
        });
      }
      if (onSuccess) onSuccess();
      if (!item) {
        setName("");
        setDescription("");
        setQuantity(1);
        setPrice("");
        setCategoryId("");
        setImageUrl("");
      }
    } catch (err) {
      setError("Failed to save item");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{item ? "Edit Item" : "Add Item"}</h3>
      <div>
        <label>Name:</label>
        <input
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Quantity:</label>
        <input
          type="number"
          min="1"
          value={quantity}
          required
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={price}
          required
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div>
        <label>Category:</label>
        <select
          value={categoryId}
          required
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select...</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Image URL:</label>
        <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit" disabled={submitting}>
        {submitting ? "Saving..." : item ? "Update" : "Add"}
      </button>
      {item && (
        <button type="button" onClick={onCancel} style={{ marginLeft: "10px" }}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default ItemForm;
