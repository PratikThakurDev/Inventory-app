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

const ItemList = ({ categoryId, refreshToggle, onEdit }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchItems();
  }, [refreshToggle, categoryId]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const url = categoryId
        ? `http://localhost:5000/api/items/category/${categoryId}`
        : `http://localhost:5000/api/items`;
      const res = await axios.get(url);
      setItems(res.data);
    } catch {
      // handle error if needed
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
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`http://localhost:5000/api/items/${id}`);
        fetchItems();
      } catch {
        alert("Failed to delete item");
      }
    }
  };

  const handleEdit = (item) => {
    if (!verifyPassword()) return;
    onEdit(item);
  };

  return (
    <Box borderWidth="1px" borderRadius="md" p={4}>
      <Text fontSize="xl" mb={4}>
        Items {categoryId ? `(Category ${categoryId})` : ""}
      </Text>

      {loading ? (
        <Flex justify="center">
          <Spinner />
        </Flex>
      ) : (
        <List spacing={3}>
          {items.map((item) => (
            <ListItem
              key={item.id}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text>
                {item.name} - {item.description} - Qty: {item.quantity} - ₹
                {item.price}
              </Text>
              <Box>
                <Button
                  size="sm"
                  onClick={() => handleEdit(item)}
                  mr={2}
                  colorScheme="blue"
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleDelete(item.id)}
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

export default ItemList;
