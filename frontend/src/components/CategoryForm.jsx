import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

const CategoryForm = ({ category, onSuccess, onCancel }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description || "");
    } else {
      setName("");
      setDescription("");
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      if (category) {
        await axios.put(`${API_BASE_URL}/categories/${category.id}`, {
          name,
          description,
        });
        toast.success("Category updated!");
      } else {
        await axios.post(`${API_BASE_URL}/categories`, {
          name,
          description,
        });
        toast.success("Category added!");
      }
      if (onSuccess) onSuccess();
      setName("");
      setDescription("");
    } catch {
      toast.error("Failed to save category");
      setError("Failed to save category");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      as="form"
      p={4}
      mb={6}
      borderWidth="1px"
      borderRadius="md"
      onSubmit={handleSubmit}
    >
      <FormControl mb={4} isRequired>
        <FormLabel>Name</FormLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Description</FormLabel>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormControl>

      {error && (
        <Text color="red.500" mb={4}>
          {error}
        </Text>
      )}

      <Button type="submit" colorScheme="teal" isLoading={submitting}>
        {category ? "Update" : "Add"}
      </Button>

      {category && (
        <Button ml={4} onClick={onCancel} variant="outline">
          Cancel
        </Button>
      )}
    </Box>
  );
};

export default CategoryForm;
