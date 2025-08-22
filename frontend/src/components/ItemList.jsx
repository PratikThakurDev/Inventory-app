import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ItemList = ({ categoryId }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, [categoryId]);

  const fetchItems = async () => {
    try {
      const url = categoryId
        ? `http://localhost:5000/api/items/category/${categoryId}`
        : `http://localhost:5000/api/items`;

      const res = await axios.get(url);
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching items', err);
    }
  };

  return (
    <div>
      <h2>Items {categoryId && `(Category ${categoryId})`}</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - {item.description} - Qty: {item.quantity} - ₹{item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
