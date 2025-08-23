import React, { useState, useEffect } from "react";
import axios from "axios";

const CategoryForm = ({ category, onSuccess, onCancel }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description || "");
    } else {
      setName("");
      setDescription("");
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (category) {
        // Update existing
        await axios.put(`http://localhost:5000/api/categories/${category.id}`, {
          name,
          description,
        });
      } else {
        // Create new
        await axios.post("http://localhost:5000/api/categories", {
          name,
          description,
        });
      }
      setName("");
      setDescription("");
      if (onSuccess) onSuccess();
    } catch (err) {
      setError("Failed to save category");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{category ? "Edit Category" : "Add Category"}</h3>
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
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">{category ? "Update" : "Add"}</button>
      {category && (
        <button type="button" onClick={onCancel} style={{ marginLeft: "10px" }}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default CategoryForm;
