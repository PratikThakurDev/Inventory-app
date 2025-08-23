const fs = require("fs");
const csv = require("csv-parser");
const axios = require("axios");

async function importCategories() {
  const categories = [];
  // Fetch existing categories once
  let existingCategories = [];
  try {
    const res = await axios.get("http://localhost:5000/api/categories");
    existingCategories = res.data.map((cat) => cat.name.toLowerCase());
  } catch (err) {
    console.error("Failed to fetch existing categories:", err.message);
    // proceed as if no categories exist
  }

  fs.createReadStream("categories.csv")
    .pipe(csv())
    .on("data", (row) => {
      categories.push(row);
    })
    .on("end", async () => {
      for (const category of categories) {
        try {
          if (!existingCategories.includes(category.name.toLowerCase())) {
            await axios.post("http://localhost:5000/api/categories", {
              name: category.name,
              description: category.description,
            });
            console.log(`Imported category: ${category.name}`);
            existingCategories.push(category.name.toLowerCase()); // update local list
          } else {
            console.log(`Skipped duplicate category: ${category.name}`);
          }
        } catch (error) {
          console.error(
            `Failed to import category ${category.name}:`,
            error.message
          );
        }
      }
      console.log("Category import complete");
      process.exit();
    });
}

importCategories();
