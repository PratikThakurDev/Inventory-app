import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import axios from "axios";
import { toast } from "react-toastify";

const ItemForm = ({ item, onSuccess, onCancel }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories");
        setCategories(res.data);
      } catch {
        toast.error("Failed to fetch categories");
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (item) {
      setName(item.name);
      setDescription(item.description || "");
      setQuantity(item.quantity);
      setPrice(item.price);
      setCategoryId(item.category_id);
    } else {
      setName("");
      setDescription("");
      setQuantity(1);
      setPrice("");
      setCategoryId("");
    }
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      if (item) {
        await axios.put(`http://localhost:5000/api/items/${item.id}`, {
          name,
          description,
          quantity: Number(quantity),
          price: Number(price),
          category_id: Number(categoryId),
        });
        toast.success("Item updated!");
      } else {
        await axios.post("http://localhost:5000/api/items", {
          name,
          description,
          quantity: Number(quantity),
          price: Number(price),
          category_id: Number(categoryId),
        });
        toast.success("Item added!");
      }
      if (onSuccess) onSuccess();
      if (!item) {
        setName("");
        setDescription("");
        setQuantity(1);
        setPrice("");
        setCategoryId("");
      }
    } catch {
      toast.error("Failed to save item");
      setError("Failed to save item");
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
      <FormControl mb={3} isRequired>
        <FormLabel>Name</FormLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </FormControl>

      <FormControl mb={3}>
        <FormLabel>Description</FormLabel>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormControl>

      <FormControl mb={3} isRequired>
        <FormLabel>Quantity</FormLabel>
        <NumberInput min={1} value={quantity} onChange={setQuantity}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      <FormControl mb={3} isRequired>
        <FormLabel>Price</FormLabel>
        <NumberInput min={0} precision={2} value={price} onChange={setPrice}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      <FormControl mb={3} isRequired>
        <FormLabel>Category</FormLabel>
        <Select
          placeholder="Select category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </Select>
      </FormControl>

      {error && (
        <Text color="red.500" mb={3}>
          {error}
        </Text>
      )}

      <Button type="submit" colorScheme="teal" isLoading={submitting}>
        {item ? "Update" : "Add"}
      </Button>

      {item && (
        <Button ml={3} onClick={onCancel} variant="outline">
          Cancel
        </Button>
      )}
    </Box>
  );
};

export default ItemForm;
