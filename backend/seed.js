const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

const products = [
  {
    name: "Apple",
    image: "http://localhost:5000/assets/apple.jpg",
    description: "Fresh apples from local farms",
    price: 20,
  },
  {
    name: "Banana",
    image: "http://localhost:5000/assets/banana.jpg",
    description: "Organic bananas",
    price: 8,
  },
  {
    name: "Orange",
    image: "http://localhost:5000/assets/orange.jpg",
    description: "Juicy oranges",
    price: 12,
  },
  // Add more products...
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Seeded products");
    process.exit();
  });