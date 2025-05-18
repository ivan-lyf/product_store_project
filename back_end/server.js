// const express = require('express'); This sintax works but not too modern
import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';

import productRoute from "./routes/product.routes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); // allows to accept JSON data in req.body

app.use("/api/products", productRoute);


app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});

app.get("/", (req, res) => {
  res.send("✅ Backend is working!");
});

