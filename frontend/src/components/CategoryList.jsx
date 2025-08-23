import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ADMIN_PASSWORD } from '../config';

const CategoryList = ({ onSelect, refreshToggle, onEdit }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, [refreshToggle]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories', err);
    }
    setLoading(false);
  };

  const verifyPassword = () => {
    const entered = window.prompt('Enter admin password:');
    if (entered !== ADMIN_PASSWORD) {
      alert('Incorrect password. Action cancelled.');
      return false;
    }
    return true;
  };

  const handleDelete = async (id) => {
    if (!verifyPassword()) return;
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

  const handleEdit = (category) => {
    if (!verifyPassword()) return;
    onEdit(category);
  };

  return (
    <div>
      <h2>Categories</h2>
      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <ul>
          {categories.map(cat => (
            <li key={cat.id}>
              <span onClick={() => onSelect(cat.id)} style={{ cursor: 'pointer', marginRight: '10px' }}>
                {cat.name} - {cat.description}
              </span>
              <button onClick={() => handleEdit(cat)}>Edit</button>
              <button onClick={() => handleDelete(cat.id)} style={{ marginLeft: '5px' }}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryList;
