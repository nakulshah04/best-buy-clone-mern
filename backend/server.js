/* Other commonly used names for this file are app.js, index.js, and main.js.
This file is the entry point for our API. */

// const express = require('express');

// To access the MongoDB URI
import dotenv from "dotenv";
// To be able to do this, we go to package.json and create "type": "module" to use import export syntax
import express from "express";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const app = express();

// Middleware to parse the JSON bodies passed in the requests
app.use(express.json());

app.get("/api/products", async (req, res) => {
    try {
        // Since we're passing an empty object, it will return all products
        const products = await Product.find({});
        // Return the products as a JSON response
        res.status(200).json({ success: true, data: products });
    }
    catch (error) {
        // If there is an error, we log it to the console and return a 500 status code
        console.log("Error fetching products:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

// User will send a POST request to this endpoint with product data
app.post("/api/products", async(req, res) => {
    const product = req.body;
    if  (!product.name || !product.price || !product.image) {
        // Status 400 means Bad Request
        // This means that the user did not provide all the required fields
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }
    // Insert the product body into the newProduct instance of the Product model
    const newProduct = new Product(product);
    try {
        // Save the new product to the database
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error creating product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

// User will send a DELETE request to this endpoint with the product id
app.delete("/api/products/:id", async(req, res) => {
    // // The id will be dynamically passed in the URL
    // Extract the product id from the request parameters
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.json({ success: true, message: "Product deleted successfully" });

    } catch (error) {
        res.status(404).json({ success: false, message: "Product not found" });
    }
});

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
})