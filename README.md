Inventory Management API
A backend API for managing categories and items in an inventory system, built with Node.js, Express, and PostgreSQL. Supports CRUD operations and bulk CSV import for categories and items.

Features
RESTful API for managing categories and items

CSV import scripts for categories and items with duplicate and foreign key checks

Search and filter items by category

Proper error handling and validations

PostgreSQL database integration using node-postgres (pg)

Prerequisites
Node.js (v14+ recommended)

PostgreSQL

npm

Installation
Clone the repository:

bash
git clone <repository-url>
cd inventory-app
Install dependencies:

bash
npm install
Configure your PostgreSQL database:

Create a database named (e.g., inventory_db)

Update .env or configuration files with DB connection details

Usage
Start the server
bash
npm start
The server listens on port 5000 by default.

API Endpoints
/api/categories: Manage categories (GET, POST, PUT, DELETE)

/api/items: Manage items (GET, POST, PUT, DELETE)

/api/items/category/:category_id: Get items by category

Importing Data from CSV
Categories
CSV file categories.csv should have columns:

text
name,description
Electronics,Devices and gadgets
Books,Fiction and Non-fiction books
...
Run the import script:

bash
node import-categories.js
Items
CSV file items.csv should have columns:

text
name,description,quantity,price,category_name,image_url
Apple iPhone 14,Latest model,15,79999,Smartphones,https://image-url
Dell XPS 13,Laptop,10,99999,Laptops,https://image-url
...
Run the import script:

bash
node import-items.js
Note: Items link to categories using category_name.

Project Structure
text
.
├── routes/ # Express routers (categories, items)
├── import-categories.js # Script to import categories from CSV
├── import-items.js # Script to import items from CSV
├── db.js # PostgreSQL connection pool
├── server.js # Main Express app
├── package.json
└── README.md
Troubleshooting
Ensure category names in items.csv exactly match those in your database (case-sensitive).

Fix foreign key errors by importing categories before items.

Check your database connection params.

License
MIT License
