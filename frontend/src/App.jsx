import React, { useState } from 'react';
import CategoryList from './components/CategoryList';
import CategoryForm from './components/CategoryForm';
import ItemList from './components/ItemList';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [refreshCategories, setRefreshCategories] = useState(false);

  const handleCategorySelect = (id) => {
    setSelectedCategory(id);
  };

  const refreshCategoryList = () => {
    setRefreshCategories(prev => !prev);
  };

  return (
    <div className="App">
      <h1>Inventory App</h1>
      <CategoryForm onSuccess={refreshCategoryList} />
      <CategoryList onSelect={handleCategorySelect} refreshToggle={refreshCategories} />
      <ItemList categoryId={selectedCategory} />
    </div>
  );
}

export default App;
