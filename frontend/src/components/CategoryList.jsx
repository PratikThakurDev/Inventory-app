import React, { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  Button,
  Text,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { ADMIN_PASSWORD } from "../config";

const CategoryList = ({ onSelect, refreshToggle, onEdit }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, [refreshToggle]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  const verifyPassword = () => {
    const entered = window.prompt("Enter admin password:");
    if (entered !== ADMIN_PASSWORD) {
      alert("Incorrect password. Action cancelled.");
      return false;
    }
    return true;
  };

  const handleDelete = async (id) => {
    if (!verifyPassword()) return;
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`http://localhost:5000/api/categories/${id}`);
        fetchCategories();
      } catch {
        alert("Failed to delete category");
      }
    }
  };

  const handleEdit = (category) => {
    if (!verifyPassword()) return;
    onEdit(category);
  };

  return (
    <Box borderWidth="1px" borderRadius="md" p={4}>
      <Text fontSize="xl" mb={4}>
        Categories
      </Text>
      {loading ? (
        <Flex justify="center">
          <Spinner />
        </Flex>
      ) : (
        <List spacing={3}>
          {categories.map((cat) => (
            <ListItem
              key={cat.id}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text cursor="pointer" onClick={() => onSelect(cat.id)}>
                {cat.name} - {cat.description}
              </Text>
              <Box>
                <Button
                  size="sm"
                  onClick={() => handleEdit(cat)}
                  mr={2}
                  colorScheme="blue"
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleDelete(cat.id)}
                  colorScheme="red"
                >
                  Delete
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default CategoryList;
