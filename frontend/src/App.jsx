import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  Select,
  SimpleGrid,
  Text,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";

import CategoryForm from "./components/CategoryForm";
import CategoryList from "./components/CategoryList";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";

function SearchTab({ onSelectCategory }) {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchItems();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch {
      setCategories([]);
    }
  };

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/items");
      setItems(res.data);
    } catch {
      setItems([]);
    }
    setLoading(false);
  };

  const filteredItems = items.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchText.toLowerCase()) &&
      (filterCategory === "" || item.category_id === Number(filterCategory))
    );
  });

  return (
    <Box>
      <Flex mb={4} gap={4}>
        <Input
          placeholder="Search items..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Select
          placeholder="Filter by category"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </Select>
      </Flex>

      {loading ? (
        <Flex justify="center">
          <Spinner size="lg" />
        </Flex>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          {filteredItems.map((item) => (
            <Box
              key={item.id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              onClick={() => onSelectCategory(item.category_id)}
            >
              <Text fontWeight="bold">{item.name}</Text>
              {item.description && <Text>{item.description}</Text>}
              <Text fontSize="sm">
                Qty: {item.quantity} | ₹{item.price}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [refreshCategories, setRefreshCategories] = useState(false);
  const [refreshItems, setRefreshItems] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const handleCategorySelect = (id) => {
    setSelectedCategory(id);
    setTabIndex(2); // switch to Items tab
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
      <Heading mb={6} textAlign="center">
        Inventory Management
      </Heading>

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
    </Box>
  );
}
