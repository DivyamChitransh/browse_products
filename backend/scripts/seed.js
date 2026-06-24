import dotenv from "dotenv";
import pool from "../config/db.js";

dotenv.config();

const categories = ["electronics","fashion","books","sports","home","beauty",];

const TOTAL_PRODUCTS = 200000;
const BATCH_SIZE = 5000;

const seedProducts = async () => {
  try {

    await pool.query("TRUNCATE TABLE products RESTART IDENTITY");

    for ( let start = 0;start < TOTAL_PRODUCTS;start += BATCH_SIZE) {
      const values = [];
      const placeholders = [];
      let paramIndex = 1;

      for (let i = start;i < Math.min(start + BATCH_SIZE, TOTAL_PRODUCTS);i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const price = (Math.random()*10000).toFixed(2);
        const createdAt = new Date(Date.now() - Math.floor(Math.random() *365)*24*60*60*1000);
        const updatedAt = new Date(createdAt.getTime() + Math.floor(Math.random() * 30)*24*60*60*1000);

        placeholders.push(
          `($${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++})`
        );

        values.push(`Product ${i + 1}`,category,price,createdAt,updatedAt);
    }

      const query = `INSERT INTO products
        (name,category,price,created_at,updated_at)
        VALUES ${placeholders.join(",")}`;
        await pool.query(query, values);
        
        console.log(`${Math.min(start + BATCH_SIZE,TOTAL_PRODUCTS)} products inserted`);
    }

    console.log(
      `Successfully inserted ${TOTAL_PRODUCTS} products`
    );

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProducts();