import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  Select,
  SimpleGrid,
  Text,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";

const SearchTab = ({ onSelectCategory }) => {
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
    } finally {
      setLoading(false);
    }
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
      ) : filteredItems.length === 0 ? (
        <Text>No items found.</Text>
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
};

export default SearchTab;
