import mongoose from 'mongoose';
import Product from '../models/product.model.js';

export const getProducts = async (req, res) => {
    try {
        // Assuming Product is a Mongoose model
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const createProduct = async (req, res) => {
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
}

export const updateProduct = async(req, res) => {
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
}

export const deleteProduct = async(req, res) => {
    // // The id will be dynamically passed in the URL
    // Extract the product id from the request parameters
    const { id } = req.params;

    // Check if the id is a valid MongoDB ObjectId
    if(mongoose.Types.ObjectId.isValid(id) === false) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }
    
    try {
        await Product.findByIdAndDelete(id);
        res.json({ success: true, message: "Product deleted successfully" });

    } catch (error) {
        console.log("Error deleting product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}