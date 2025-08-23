import React, { useState } from 'react';
import CategoryList from './components/CategoryList';
import CategoryForm from './components/CategoryForm';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [refreshCategories, setRefreshCategories] = useState(false);
  const [refreshItems, setRefreshItems] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  const handleCategorySelect = (id) => {
    setSelectedCategory(id);
  };

  const refreshCategoryList = () => {
    setRefreshCategories(prev => !prev);
    setCategoryToEdit(null);
  };

  const refreshItemList = () => setRefreshItems(prev => !prev);

  return (
    <div className="App">
      <h1>Inventory App</h1>
      <CategoryForm
        category={categoryToEdit}
        onSuccess={refreshCategoryList}
        onCancel={() => setCategoryToEdit(null)}
      />
      <CategoryList
        onSelect={handleCategorySelect}
        refreshToggle={refreshCategories}
        onEdit={setCategoryToEdit}
      />
      <ItemForm onSuccess={refreshItemList} />
      <ItemList categoryId={selectedCategory} refreshToggle={refreshItems} />
    </div>
  );
}

export default App;
