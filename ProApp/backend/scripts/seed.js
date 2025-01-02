const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const products = [
  {
    name: "iPhone 15 Pro",
    price: 999.99,
    description: "Latest iPhone with advanced camera system and A17 Pro chip",
    imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845702708"
  },
  {
    name: "MacBook Air M2",
    price: 1199.99,
    description: "Superfast M2 chip with all-day battery life",
    imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665"
  },
  {
    name: "AirPods Pro",
    price: 249.99,
    description: "Active noise cancellation for immersive sound",
    imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1660803972361"
  },
  {
    name: "iPad Air",
    price: 599.99,
    description: "Powerful. Colorful. Wonderful.",
    imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-wifi-blue-202203?wid=940&hei=1112&fmt=png-alpha&.v=1645065732688"
  },
  {
    name: "Apple Watch Series 9",
    price: 399.99,
    description: "Next-generation health and fitness companion",
    imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-case-45-aluminum-midnight-nc-s9_VW_PF_WF_SI?wid=1400&hei=1400&fmt=jpeg&qlt=90&.v=1693281261356"
  }
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    const result = await Product.insertMany(products);
    console.log(`Added ${result.length} products`);

    console.log('Seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts(); 