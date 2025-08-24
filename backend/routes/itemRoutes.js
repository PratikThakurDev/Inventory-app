const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get all items
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM items ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get items by category ID
router.get("/category/:category_id", async (req, res) => {
  try {
    const { category_id } = req.params;
    const result = await pool.query(
      "SELECT * FROM items WHERE category_id = $1 ORDER BY id",
      [category_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get single item by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM items WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Create new item
router.post("/", async (req, res) => {
  try {
    const { name, description, quantity, price, category_id, image_url } =
      req.body;
    const result = await pool.query(
      "INSERT INTO items (name, description, quantity, price, category_id, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, description, quantity, price, category_id, image_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update existing item
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, quantity, price, category_id, image_url } =
      req.body;
    const result = await pool.query(
      `UPDATE items SET name=$1, description=$2, quantity=$3, price=$4, category_id=$5, image_url=$6 WHERE id=$7 RETURNING *`,
      [name, description, quantity, price, category_id, image_url, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete item
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM items WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ message: "Item deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
