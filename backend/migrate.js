const pool = require("./db/index");

async function migrate() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        quantity INT NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        category_id INT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
        image_url TEXT
      );
    `);

    console.log("Tables created successfully.");
  } catch (err) {
    console.error("Error migrating:", err);
  } finally {
    await pool.end();
  }
}

migrate();
