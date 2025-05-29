/* Other commonly used names for this file are app.js, index.js, and main.js.
This file is the entry point for our API. */

// const express = require('express');

import express from 'express';
// To be able to do this, we go to package.json and create "type": "module" to use import export syntax

const app = express();

app.listen(5000, () => {
    console.log("Server started at http://localhost:5000");
})