import mongoose from "mongoose";

// Schema is a blueprint for the structure of documents in a MongoDB collection
const productSchema = new mongoose.Schema({
    // Defining the schema for the Product model
    // Each product will have a name, price, and image
    // The 'required' field ensures that these properties must be provided when creating a product
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0.0,
    },
    image: {
        type: String,
        required: true,
    },
    }, {
    // Automatically manages createdAt and updatedAt fields
    timestamps: true,
});

const Product = mongoose.model("Product", productSchema);

// Exporting the Product model to be used in other parts of the application
// This allows us to create, read, update, and delete products in the database
export default Product;