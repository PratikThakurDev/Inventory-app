import React, { useState } from 'react';
import CategoryList from './components/CategoryList';
import ItemList from './components/ItemList';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (id) => {
    setSelectedCategory(id);
  };

  return (
    <div className="App">
      <h1>Inventory App</h1>
      <CategoryList onSelect={handleCategorySelect} />
      <ItemList categoryId={selectedCategory} />
    </div>
  );
}

export default App;
