import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  // Notification helpers
  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  return (
    <div className="App">
      <h1>Inventory App</h1>

      <CategoryForm
        category={categoryToEdit}
        onSuccess={() => {
          refreshCategoryList();
          notifySuccess("Category saved successfully!");
        }}
        onCancel={() => setCategoryToEdit(null)}
      />
      <CategoryList
        onSelect={handleCategorySelect}
        refreshToggle={refreshCategories}
        onEdit={(cat) => {
          setCategoryToEdit(cat);
          notifySuccess("Editing category");
        }}
        notifySuccess={notifySuccess}
        notifyError={notifyError}
      />

      <ItemForm
        item={itemToEdit}
        onSuccess={() => {
          refreshItemList();
          notifySuccess("Item saved successfully!");
        }}
        onCancel={() => setItemToEdit(null)}
      />
      <ItemList
        categoryId={selectedCategory}
        refreshToggle={refreshItems}
        onEdit={(item) => {
          setItemToEdit(item);
          notifySuccess("Editing item");
        }}
        notifySuccess={notifySuccess}
        notifyError={notifyError}
      />

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
