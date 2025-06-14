/* Other commonly used names for this file are app.js, index.js, and main.js.
This file is the entry point for our API. */

// const express = require('express');

// To access the MongoDB URI
import dotenv from "dotenv";
// To be able to do this, we go to package.json and create "type": "module" to use import export syntax
import express from "express";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();

// Port on which the server will run
const port = process.env.PORT || 5050;

// Middleware to parse the JSON bodies passed in the requests
app.use(express.json());

app.use("/api/products", productRoutes);

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
})