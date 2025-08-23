const express = require("express");
require('dotenv').config();
const cors = require("cors");
const pool = require("./db");
const categoryRoutes = require("./routes/categoryRoutes");
const itemRoutes = require('./routes/itemRoutes');

const app = express();
app.use(cors());
app.use(express.json()); // to parse JSON bodies

app.use('/api/items', itemRoutes);
app.use("/api/categories", categoryRoutes);

app.post('/api/verify-admin', (req, res) => {

  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ success: false, message: 'Password missing' });
  }
  
  if (password === process.env.ADMIN_PASSWORD) {
    return res.json({ success: true });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid password' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);

});
