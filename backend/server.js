/* Other commonly used names for this file are app.js, index.js, and main.js.
This file is the entry point for our API. */

// const express = require('express');

// To access the MongoDB URI
import dotenv from "dotenv";
// To be able to do this, we go to package.json and create "type": "module" to use import export syntax
import express from "express";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

app.post("/products", async(req, res) => {
    // User will send a POST request to this endpoint with product data
    const product = req.body;
    if  (!product.name || !product.price || !product.image) {
        // Status 400 means Bad Request
        // This means that the user did not provide all the required fields
        return res.status(400).json({ message: "All fields are required" });
    }
});

// console.log(process.env.MONGO_URI)

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
})