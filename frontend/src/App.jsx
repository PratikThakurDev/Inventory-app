import React, { useState } from "react";
import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Spacer,
} from "@chakra-ui/react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ColorModeToggle from "./components/ColorModeToggle";
import SearchTab from "./components/SearchTab";
import CategoryForm from "./components/CategoryForm";
import CategoryList from "./components/CategoryList";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [refreshCategories, setRefreshCategories] = useState(false);
  const [refreshItems, setRefreshItems] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const handleCategorySelect = (id) => {
    setSelectedCategory(id);
    setTabIndex(2);
  };

  const refreshCategoryList = () => {
    setRefreshCategories((prev) => !prev);
    setCategoryToEdit(null);
  };

  const refreshItemList = () => {
    setRefreshItems((prev) => !prev);
    setItemToEdit(null);
  };

  return (
    <Box p={6}>
      <Flex align="center" mb={6}>
        <Heading>Inventory Management</Heading>
        <Spacer />
        <ColorModeToggle />
      </Flex>

      <Tabs isFitted variant="enclosed" index={tabIndex} onChange={setTabIndex}>
        <TabList mb="1em">
          <Tab>Search Items</Tab>
          <Tab>Categories</Tab>
          <Tab>Items</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <SearchTab onSelectCategory={handleCategorySelect} />
          </TabPanel>

          <TabPanel>
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
          </TabPanel>

          <TabPanel>
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
          </TabPanel>
        </TabPanels>
      </Tabs>

      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
}

export default App;
