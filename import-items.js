const fs = require("fs");
const csv = require("csv-parser");
const axios = require("axios");

async function getCategoryIdByName(name) {
  try {
    const res = await axios.get(`http://localhost:5000/api/categories`);
    const category = res.data.find(
      (cat) => cat.name.toLowerCase() === name.toLowerCase()
    );
    if (category) {
      return category.id;
    } else {
      console.warn(`Category not found: ${name}`);
      return null;
    }
  } catch (err) {
    console.error(`Failed to fetch categories:`, err.message);
    return null;
  }
}

async function importItems() {
  const items = [];
  // Fetch existing item names to prevent duplicates
  let existingItems = [];
  try {
    const res = await axios.get("http://localhost:5000/api/items");
    existingItems = res.data.map((item) => item.name.toLowerCase());
  } catch (err) {
    console.error("Failed to fetch existing items:", err.message);
    // proceed as if no items exist
  }

  fs.createReadStream("items.csv")
    .pipe(csv())
    .on("data", (row) => {
      items.push(row);
    })
    .on("end", async () => {
      for (const item of items) {
        try {
          if (existingItems.includes(item.name.toLowerCase())) {
            console.log(`Skipped duplicate item: ${item.name}`);
            continue;
          }

          const categoryId = await getCategoryIdByName(item.category_name);
          if (!categoryId) {
            console.error(
              `Skipping item ${item.name}; category not found: ${item.category_name}`
            );
            continue;
          }

          await axios.post("http://localhost:5000/api/items", {
            name: item.name,
            description: item.description,
            quantity: Number(item.quantity),
            price: Number(item.price),
            category_id: categoryId,
            image_url: item.image_url,
          });
          console.log(`Imported item: ${item.name}`);

          existingItems.push(item.name.toLowerCase()); // update local cache to avoid duplicates within CSV
        } catch (error) {
          console.error(`Failed to import item ${item.name}:`, error.message);
        }
      }
      console.log("Item import complete");
      process.exit();
    });
}

importItems();
