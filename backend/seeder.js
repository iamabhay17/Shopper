const express = require("express");
const products = require("./data/products");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Order = require("./model/orderModel");
const Product = require("./model/productModel");
const User = require("./model/userModel");
const users = require("./data/users");

dotenv.config();

const DB = process.env.MONGO_URI;

mongoose.connect(DB, () => {
  console.log("connected to database");
});

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);
    console.log("data imported");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("data destroyed");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
