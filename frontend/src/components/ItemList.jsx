import React, { useEffect, useState } from "react";
import axios from "axios";
import { ADMIN_PASSWORD } from "../config";

const ItemList = ({
  categoryId,
  refreshToggle,
  onEdit,
  notifySuccess,
  notifyError,
}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchItems();
  }, [refreshToggle, categoryId]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const url = categoryId
        ? `http://localhost:5000/api/items/category/${categoryId}`
        : `http://localhost:5000/api/items`;
      const res = await axios.get(url);
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching items", err);
    }
    setLoading(false);
  };

  const verifyPassword = () => {
    const entered = window.prompt("Enter admin password:");
    if (entered !== ADMIN_PASSWORD) {
      alert("Incorrect password. Action cancelled.");
      return false;
    }
    return true;
  };

  const handleDelete = async (id) => {
    if (!verifyPassword()) return;
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`http://localhost:5000/api/items/${id}`);
        fetchItems();
        notifySuccess?.("Item deleted successfully!");
      } catch (err) {
        notifyError?.("Failed to delete item");
        console.error(err);
      }
    }
  };

  const handleEdit = (item) => {
    if (!verifyPassword()) return;
    onEdit(item);
  };

  return (
    <div>
      <h2>Items {categoryId && `(Category ${categoryId})`}</h2>
      {loading ? (
        <p>Loading items...</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <span style={{ marginRight: "10px" }}>
                {item.name} - {item.description} - Qty: {item.quantity} - ₹
                {item.price}
              </span>
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button
                onClick={() => handleDelete(item.id)}
                style={{ marginLeft: "5px" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemList;
