import express from 'express';
import { createProduct, getProducts, updateProduct, deleteProduct } from '../controllers/product.controller.js';

const router = express.Router();

router.get("/", getProducts);

// User will send a POST request to this endpoint with product data
router.post("/", createProduct);

// If updating all the fields of a product, we send a PUT request
// If updating only a few fields of a product, we send a PATCH request
router.put("/:id", updateProduct);

// User will send a DELETE request to this endpoint with the product id
router.delete("/:id", deleteProduct);

export default router;