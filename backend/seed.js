const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const products = [
    {
        name: "Apple",
        image: "https://via.placeholder.com/100?text=Apple",
        description: "Fresh apples from local farms",
        price: 2
    },
    {
        name: "Banana",
        image: "https://via.placeholder.com/100?text=Banana",
        description: "Organic bananas",
        price: 1
    },
    // ...8 more products
];

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        await Product.deleteMany({});
        await Product.insertMany(products);
        console.log("Seeded products");
        process.exit();
    });