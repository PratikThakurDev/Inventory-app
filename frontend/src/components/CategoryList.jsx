import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryList = ({ onSelect , refreshToggle }) => {
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

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map(cat => (
          <li key={cat.id} onClick={() => onSelect(cat.id)} style={{ cursor: 'pointer' }}>
            {cat.name} - {cat.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
