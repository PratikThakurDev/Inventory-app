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
import { toast } from "react-toastify";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";


const CategoryList = ({ onSelect, refreshToggle, onEdit }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, [refreshToggle]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/categories`);
      setCategories(res.data);
    } catch {
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const verifyPassword = async () => {
    const entered = window.prompt("Enter admin password:");
    if (!entered) return false;

    const trimmedPassword = entered.trim();
    if (!trimmedPassword) {
      alert("Password required.");
      return false;
    }

    try {
      const res = await axios.post(
        `${API_BASE_URL}/verify-admin`,
        {
          password: trimmedPassword,
        }
      );
      if (res.data.success) {
        return true;
      } else {
        alert("Incorrect password. Action cancelled.");
        return false;
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Verification failed. Please try again later."
      );
      return false;
    }
  };

  const handleDelete = async (id) => {
    if (!(await verifyPassword())) return; // Await here
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`${API_BASE_URL}/categories/${id}`);
        fetchCategories();
        toast.success("Category deleted successfully!");
      } catch {
        toast.error("Failed to delete category");
      }
    }
  };

  const handleEdit = async (category) => {
    if (!(await verifyPassword())) return; // Await here too
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
