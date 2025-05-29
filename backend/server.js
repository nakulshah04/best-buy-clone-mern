/* Other commonly used names for this file are app.js, index.js, and main.js.
This file is the entry point for our API. */

// const express = require('express');

// To access the MongoDB URI
import dotenv from "dotenv";
// To be able to do this, we go to package.json and create "type": "module" to use import export syntax
import express from "express";

dotenv.config();

const app = express();

app.get("/", (req, res) => {});

console.log(process.env.MONGO_URI)

app.listen(5000, () => {
    console.log("Server started at http://localhost:5000");
})