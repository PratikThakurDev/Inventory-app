import React, { useState } from 'react';
import axios from 'axios';

const CategoryForm = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await axios.post('http://localhost:5000/api/categories', { name, description });
      setName('');
      setDescription('');
      if (onSuccess) onSuccess();
    } catch (err) {
      setError('Failed to create category');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Category</h3>
      <div>
        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <input value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Add Category</button>
    </form>
  );
};

export default CategoryForm;
