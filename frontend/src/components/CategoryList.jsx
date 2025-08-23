import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryList = ({ onSelect, refreshToggle, onEdit }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, [refreshToggle]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await axios.delete(`http://localhost:5000/api/categories/${id}`);
        fetchCategories();
      } catch (err) {
        alert('Failed to delete category');
        console.error(err);
      }
    }
  };

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map(cat => (
          <li key={cat.id}>
            <span onClick={() => onSelect(cat.id)} style={{ cursor: 'pointer', marginRight: '10px' }}>
              {cat.name} - {cat.description}
            </span>
            <button onClick={() => onEdit(cat)}>Edit</button>
            <button onClick={() => handleDelete(cat.id)} style={{ marginLeft: '5px' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
