import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "../config/db.js";
import Category from "../models/Category.js";
import { defaultCategories } from "../data/defaultCategories.js";

dotenv.config();

const seedCategories = async () => {
  try {
    await connectDB();

    await Category.deleteMany();

    await Category.insertMany(defaultCategories);

    console.log("Categories Seeded");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedCategories();