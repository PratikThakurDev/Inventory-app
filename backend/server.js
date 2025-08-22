const express = require("express");
const cors = require("cors");
const pool = require("./db");
const categoryRoutes = require("./routes/categoryRoutes");
const itemRoutes = require('./routes/itemRoutes');

const app = express();
app.use(cors());
app.use(express.json()); // to parse JSON bodies

app.use('/api/items', itemRoutes);
app.use("/api/categories", categoryRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Inventory API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
