import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/product.model.js';

const router = express.Router();

router.get("/", async (req, res) => {
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
router.post("/", async(req, res) => {
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

// If updating all the fields of a product, we send a PUT request
// If updating only a few fields of a product, we send a PATCH request
router.put("/:id", async(req, res) => {
    const { id } = req.params;
    // Contains the different fields of the product that we want to update
    const product = req.body;

    // Check if the id is a valid MongoDB ObjectId
    if(mongoose.Types.ObjectId.isValid(id) === false) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }

    try {
        // findByIdAndUpdate will find the product by id and update it with the new product data
        // new: true means that we want to return the updated product
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({ success: true, updatedProduct});
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

// User will send a DELETE request to this endpoint with the product id
router.delete("/:id", async(req, res) => {
    // // The id will be dynamically passed in the URL
    // Extract the product id from the request parameters
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.json({ success: true, message: "Product deleted successfully" });

    } catch (error) {
        console.log("Error deleting product:", error.message);
        res.status(404).json({ success: false, message: "Product not found" });
    }
});

export default router;