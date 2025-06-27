import express from 'express';
import dotenv from "dotenv";
import cors from 'cors'; // ✅ ADD THIS
import { connectDB } from './config/db.js';
import productRoute from "./routes/product.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ ADD CORS HERE
app.use(cors({
  origin: 'https://product-store-project-782f.onrender.com',
  credentials: true
}));

app.use(express.json());
app.use("/api/products", productRoute);

connectDB(); // good to call before listen

app.listen(PORT, () => {
  console.log("✅ Server started on http://localhost:" + PORT);
});

app.get("/", (req, res) => {
  res.send("✅ Backend is working!");
});
