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
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

const SearchTab = ({ onSelectCategory }) => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch categories once on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/categories`);
        setCategories(res.data);
      } catch {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  // Fetch filtered items whenever filterCategory or searchText changes
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        let url = `${API_BASE_URL}/items`;
        if (filterCategory) {
          url = `${API_BASE_URL}/items/category/${filterCategory}`;
        }
        const res = await axios.get(url);
        // further filter results by search text client-side
        const filtered = res.data.filter((item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setItems(filtered);
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [filterCategory, searchText]);

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
      ) : items.length === 0 ? (
        <Text>No items found.</Text>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          {items.map((item) => (
            <Box
              key={item.id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              cursor="pointer"
              _hover={{
                bg: "gray.100",
                color: "gray.800",
                boxShadow: "md",
                transition: "background-color 0.2s, color 0.2s",
              }}
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
