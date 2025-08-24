require("dotenv").config();
const pool = require("./db"); // Adjust path as needed

async function seed() {
  try {
    const categoriesData = [
      { id: 1, name: "Electronics", description: "Devices and gadgets" },
      { id: 2, name: "Books", description: "Printed and digital books" },
      { id: 3, name: "Laptops", description: "Portable computers" },
      { id: 4, name: "Headphones", description: "Audio devices" },
      {
        id: 5,
        name: "Sportswear",
        description: "Clothing and shoes for sports",
      },
      {
        id: 6,
        name: "Kitchen Appliances",
        description: "Home kitchen products",
      },
      { id: 7, name: "Furniture", description: "Home and office furniture" },
      {
        id: 8,
        name: "Mobile Accessories",
        description: "Accessories for mobile phones",
      },
      { id: 9, name: "Toys", description: "Children's toys and games" },
      {
        id: 10,
        name: "Health & Beauty",
        description: "Personal care products",
      },
      { id: 11, name: "Smart Home", description: "Home automation devices" },
      {
        id: 12,
        name: "Outdoor Gear",
        description: "Camping and hiking equipment",
      },
      { id: 13, name: "Pet Supplies", description: "Products for pets" },
      {
        id: 14,
        name: "Automotive",
        description: "Car and vehicle accessories",
      },
      {
        id: 15,
        name: "Office Supplies",
        description: "Stationery and office equipment",
      },
      { id: 16, name: "Video Games", description: "Games and consoles" },
      { id: 17, name: "Art Supplies", description: "Materials for artists" },
      {
        id: 18,
        name: "Gardening",
        description: "Tools and plants for gardening",
      },
      {
        id: 19,
        name: "Musical Instruments",
        description: "Instruments and accessories",
      },
      { id: 20, name: "Cameras", description: "Photography equipment" },
      { id: 21, name: "Jewelry", description: "Personal adornments" },
      {
        id: 22,
        name: "Travel Accessories",
        description: "Luggage and travel gear",
      },
      { id: 23, name: "Baby Products", description: "Infant care items" },
      {
        id: 24,
        name: "Home Decor",
        description: "Decorations for home interiors",
      },
      {
        id: 25,
        name: "Fitness Equipment",
        description: "Exercise machines and gear",
      },
      { id: 26, name: "Grocery", description: "Daily food and essentials" },
      {
        id: 27,
        name: "DIY Tools",
        description: "Do it yourself home repair tools",
      },
      { id: 28, name: "Bookshelves", description: "Bookshelf furniture" },
      { id: 29, name: "Sunglasses", description: "Protective eyewear" },
      { id: 30, name: "Cycling Gear", description: "Bicycles and accessories" },
      { id: 31, name: "Smartphones", description: "Mobile phones" },
      { id: 32, name: "Computers", description: "Desktops and peripherals" },
      { id: 33, name: "Watches", description: "Wrist and smart watches" },
      { id: 34, name: "Shoes", description: "All types of footwear" },
      { id: 35, name: "Clothing", description: "Men and women apparel" },
      {
        id: 36,
        name: "Furnishing",
        description: "Bedding and soft furnishings",
      },
      {
        id: 37,
        name: "Stationery",
        description: "Writing and office supplies",
      },
      {
        id: 38,
        name: "Kitchenware",
        description: "Cooks utensils and appliances",
      },
      {
        id: 39,
        name: "Bathroom Supplies",
        description: "Sanitary and bath products",
      },
      { id: 40, name: "Lighting", description: "Home and outdoor lighting" },
      {
        id: 41,
        name: "Tools & Hardware",
        description: "Building and repair tools",
      },
      { id: 42, name: "Books - Fiction", description: "Fictional literature" },
      {
        id: 43,
        name: "Books - Non-Fiction",
        description: "Non-fictional literature",
      },
      {
        id: 44,
        name: "Collectibles",
        description: "Memorabilia and collectibles",
      },
      { id: 45, name: "Pet Food", description: "Food for pets" },
      { id: 46, name: "Smart Watches", description: "Wearable technology" },
      { id: 47, name: "Camera Accessories", description: "Lenses and cases" },
      { id: 48, name: "Video Equipment", description: "TVs and monitors" },
      {
        id: 49,
        name: "Baby Toys",
        description: "Toys for babies and toddlers",
      },
      {
        id: 50,
        name: "Sports Equipment",
        description: "Gear for various sports",
      },
      {
        id: 51,
        name: "Home Appliances",
        description: "Appliances for home use",
      },
    ];

    for (const cat of categoriesData) {
      await pool.query(
        `INSERT INTO categories (name, description) VALUES ($1, $2) ON CONFLICT (name) DO NOTHING;`,
        [cat.name, cat.description]
      );
    }

    console.log("Seeded categories");

    const { rows: categories } = await pool.query(
      "SELECT id, name FROM categories"
    );
    const categoryMap = {};
    categories.forEach((cat) => {
      categoryMap[cat.name.toLowerCase()] = cat.id;
    });

    const itemsData = [
      {
        name: "Apple iPhone 14",
        description: "Latest Apple iPhone 14 model",
        quantity: 15,
        price: 79999,
        category_name: "Smartphones",
        image_url:
          "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-max-deep-purple-select?wid=940&hei=1112&fmt=png-alpha&.v=1660753619946",
      },
      {
        name: "Samsung Galaxy S23",
        description: "Newest Samsung flagship phone",
        quantity: 20,
        price: 74999,
        category_name: "Smartphones",
        image_url:
          "https://images.samsung.com/is/image/samsung/p6pim/in/sm-s911ezkginu/gallery/in-galaxy-s23-s911-agle-530895069",
      },
      {
        name: "Sony WH-1000XM5",
        description: "Noise cancelling headphones",
        quantity: 30,
        price: 29999,
        category_name: "Headphones",
        image_url:
          "https://m.media-amazon.com/images/I/71o8Q5XJS5L._SL1500_.jpg",
      },
      {
        name: "Logitech MX Master 3",
        description: "Advanced wireless mouse",
        quantity: 50,
        price: 8500,
        category_name: "Electronics",
        image_url:
          "https://resource.logitech.com/content/dam/logitech/en/products/mice/mx-master-3/gallery/mx-master-3-top-view.png",
      },
      {
        name: "Dell XPS 13",
        description: "Laptop with Intel processor",
        quantity: 12,
        price: 99999,
        category_name: "Laptops",
        image_url:
          "https://i.dell.com/sites/csimages/Video_Imagery/all/xps-13-9305-laptop-laptop-front.png",
      },
      {
        name: "HP Envy 15",
        description: "Powerful laptop for creators",
        quantity: 10,
        price: 119999,
        category_name: "Laptops",
        image_url:
          "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c06686551.png",
      },
      {
        name: "The Great Gatsby",
        description: "Famous classic novel",
        quantity: 100,
        price: 400,
        category_name: "Books - Fiction",
        image_url:
          "https://images-na.ssl-images-amazon.com/images/I/81af+MCATTL.jpg",
      },
      {
        name: "Kindle Paperwhite",
        description: "Amazon e-reader device",
        quantity: 40,
        price: 12999,
        category_name: "Books",
        image_url:
          "https://images-na.ssl-images-amazon.com/images/I/61T5l3HLxoL._AC_SL1000_.jpg",
      },
      {
        name: "Nike Air Max 270",
        description: "Sports running shoes",
        quantity: 25,
        price: 12000,
        category_name: "Sportswear",
        image_url:
          "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/7cf2140e-ee94-4a68-8f08-d87c1af68227/air-max-270-mens-shoe-KkLcGR.png",
      },
      {
        name: "Adidas Ultraboost 22",
        description: "Comfortable running shoes",
        quantity: 18,
        price: 14000,
        category_name: "Sportswear",
        image_url:
          "https://assets.adidas.com/images/w_600,f_auto,q_auto/f77279526165473287e5aadf00ca3b89_9366/Ultraboost_22_Shoes_Black_GX6829_01_standard.jpg",
      },
      {
        name: "Instant Pot Duo",
        description: "Multi-use pressure cooker",
        quantity: 35,
        price: 9000,
        category_name: "Kitchen Appliances",
        image_url:
          "https://instantpot.com/wp-content/uploads/2020/10/D07PC_127_main.png",
      },
      {
        name: "Samsung QLED TV",
        description: "4K UHD Smart TV",
        quantity: 15,
        price: 55000,
        category_name: "Video Equipment",
        image_url:
          "https://images.samsung.com/is/image/samsung/in-qled-q80b-series-qn55q80bafxza-frontblack-530876963?$720_576_PNG$",
      },
      {
        name: "Dyson V11 Vacuum",
        description: "Powerful cordless vacuum",
        quantity: 10,
        price: 45000,
        category_name: "Home Appliances",
        image_url:
          "https://cdn.dyson.com/content/dam/dyson/images/products/cordless/v11/v11-operating-mode-vacuum/V11-Detangling-Throat-Turquoise.png",
      },
      {
        name: "GoPro HERO11",
        description: "Action camera",
        quantity: 25,
        price: 35000,
        category_name: "Cameras",
        image_url:
          "https://gopro.com/content/dam/gopro/site/common/manuals/digital-assets/plugins/landscape-hero11-black.png",
      },
      {
        name: "Fujifilm X-T4",
        description: "Mirrorless camera",
        quantity: 8,
        price: 100000,
        category_name: "Cameras",
        image_url:
          "https://fujifilm-x.com/wp-content/uploads/2020/03/xt4_product_photo_black-1.png",
      },
      {
        name: "Herman Miller Aeron",
        description: "Ergonomic office chair",
        quantity: 10,
        price: 85000,
        category_name: "Furniture",
        image_url:
          "https://www.hermanmiller.com/content/dam/hermanmiller/product_images/aeron_chair/ar_medium_mk3_blk_fitz_aeron_va_lg.jpg",
      },
      {
        name: "Ikea MALM Bed",
        description: "Simple modern bed frame",
        quantity: 20,
        price: 12000,
        category_name: "Furniture",
        image_url:
          "https://www.ikea.com/in/en/images/products/malm-bed-frame__0737172_pe741012_s5.jpg",
      },
      {
        name: "Fitbit Charge 5",
        description: "Health tracking wristband",
        quantity: 30,
        price: 9000,
        category_name: "Smart Watches",
        image_url:
          "https://static-www.fitbit.com/content/assets/charge5_hero.png",
      },
      {
        name: "Garmin Forerunner 945",
        description: "GPS running watch",
        quantity: 15,
        price: 50000,
        category_name: "Smart Watches",
        image_url:
          "https://static.garmincdn.com/en/products/010-02063-10/v/cf-lg.jpg",
      },
      {
        name: "Canon EOS Rebel",
        description: "DSLR camera",
        quantity: 12,
        price: 65000,
        category_name: "Cameras",
        image_url:
          "https://cdn-ssl.camerasource.com/media/custompage/images/387989/canon-eos-rebel-t6i-dslr-camera-with-18-55mm-lens.jpg",
      },
      {
        name: "Seagate Backup Plus",
        description: "External hard drive 2TB",
        quantity: 40,
        price: 6000,
        category_name: "Computers",
        image_url:
          "https://www.seagate.com/www-content/product-content/backup-plus/backup-plus-hub-v2/gallery/backupplus_2tb_hub.jpg",
      },
      {
        name: "Apple Watch Series 8",
        description: "Latest smartwatch",
        quantity: 25,
        price: 45000,
        category_name: "Smart Watches",
        image_url:
          "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MKN63_VW_34FR+watch-44-alum-silver-nc-se_VW_34FR_WF_CO_GEO_IN?wid=940&hei=1112&fmt=png-alpha&.v=1660757818936",
      },
      {
        name: "Apple MacBook Pro",
        description: "16-inch, powerful laptop",
        quantity: 8,
        price: 220000,
        category_name: "Laptops",
        image_url:
          "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp16-spacegray-select-202110?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1632948875000",
      },
      {
        name: "Sony PlayStation 5",
        description: "Next-gen gaming console",
        quantity: 15,
        price: 49999,
        category_name: "Video Games",
        image_url:
          "https://cdn.pastemagazine.com/www/articles/ps5_console_blue-red_white_black.jpg",
      },
      {
        name: "Xbox Series X",
        description: "Microsoft gaming console",
        quantity: 15,
        price: 49999,
        category_name: "Video Games",
        image_url:
          "https://compass-ssl.xbox.com/assets/08/6a/086a7935-f8a1-4875-93f8-c8b0f78760fe.png?n=Xbox-Series-X_Console-0_Hero-1084_1920x1080.jpg",
      },
      {
        name: "Lego Star Wars",
        description: "Building sets for kids",
        quantity: 50,
        price: 5500,
        category_name: "Toys",
        image_url:
          "https://images-na.ssl-images-amazon.com/images/I/81O%2BGCkIwWL._AC_SL1500_.jpg",
      },
      {
        name: "Barbie Dreamhouse",
        description: "Toy dollhouse set",
        quantity: 20,
        price: 7500,
        category_name: "Toys",
        image_url:
          "https://cdn.shopify.com/s/files/1/1114/1714/products/1_2f89a332-2195-4889-b135-6beb01baf037_900x.jpg",
      },
      {
        name: "KitchenAid Mixer",
        description: "Stand mixer",
        quantity: 12,
        price: 28000,
        category_name: "Kitchen Appliances",
        image_url:
          "https://cdn.kitchenaid.co.in/images/mixer-hero-1920x1080.png",
      },
      {
        name: "Goodyear Tires",
        description: "Set of 4 all-season tires",
        quantity: 16,
        price: 24000,
        category_name: "Automotive",
        image_url:
          "https://cdn.goodyear.com/en-IN/consumer/images/bike/tire_all_season.jpg",
      },
      {
        name: "PetSafe Dog Crate",
        description: "Metal dog crate",
        quantity: 30,
        price: 7000,
        category_name: "Pet Supplies",
        image_url: "https://images.petsafe.net/Products/dogfullycrate_lrg.png",
      },
      {
        name: "Philips Sonicare Toothbrush",
        description: "Electric toothbrush",
        quantity: 40,
        price: 4500,
        category_name: "Health & Beauty",
        image_url:
          "https://images.philips.com/is/image/PhilipsConsumer/SonicareProtectiveClean2SeriesHX6877_02-product-zoom?wid=550&hei=550&$jpglarge$",
      },
      {
        name: "Breville Coffee Maker",
        description: "Espresso machine",
        quantity: 10,
        price: 36000,
        category_name: "Kitchen Appliances",
        image_url:
          "https://www.breville.com/content/dam/breville/global/product/bevcm800bss/bevcm800bss_hero.png",
      },
      {
        name: "Apple AirPods Pro",
        description: "Wireless earbuds",
        quantity: 25,
        price: 22000,
        category_name: "Headphones",
        image_url:
          "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MME73?wid=940&hei=1112&fmt=png-alpha&.v=1591634795000",
      },
      {
        name: "Samsung SmartFridge",
        description: "Connected refrigerator",
        quantity: 7,
        price: 180000,
        category_name: "Kitchen Appliances",
        image_url:
          "https://images.samsung.com/is/image/samsung/in-smart-refrigerator-rt60k7048s9-tl-frontsilver-530163143?$720_576_PNG$",
      },
    ];

    for (const item of itemsData) {
      const categoryId = categoryMap[item.category_name.toLowerCase()];
      if (!categoryId) {
        console.warn(
          `Category not found for item: ${item.name} (${item.category_name})`
        );
        continue;
      }
      await pool.query(
        `INSERT INTO items (name, description, quantity, price, category_id, image_url)
          VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (name) DO NOTHING;`,
        [
          item.name,
          item.description,
          item.quantity,
          item.price,
          categoryId,
          item.image_url,
        ]
      );
    }

    console.log("Seeded all items");
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    await pool.end();
  }
}

seed();
