import express from "express";
import productRoutes from "./routes/products.routes.js";
import dotenv from "dotenv";
import pool from "./config/db.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);

const startServer = async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("✅ Database Connected");
    const PORT = process.env.PORT

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database Connection Failed");
  }
};

startServer();