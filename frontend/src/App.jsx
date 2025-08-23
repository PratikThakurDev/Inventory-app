import React, { useState } from "react";
import CategoryForm from "./components/CategoryForm";
import CategoryList from "./components/CategoryList";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [refreshCategories, setRefreshCategories] = useState(false);
  const [refreshItems, setRefreshItems] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);

  const handleCategorySelect = (id) => setSelectedCategory(id);

  const refreshCategoryList = () => {
    setRefreshCategories((prev) => !prev);
    setCategoryToEdit(null);
  };

  const refreshItemList = () => {
    setRefreshItems((prev) => !prev);
    setItemToEdit(null);
  };

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

      <ItemForm
        item={itemToEdit}
        onSuccess={refreshItemList}
        onCancel={() => setItemToEdit(null)}
      />
      <ItemList
        categoryId={selectedCategory}
        refreshToggle={refreshItems}
        onEdit={setItemToEdit}
      />
    </div>
  );
}

export default App;
