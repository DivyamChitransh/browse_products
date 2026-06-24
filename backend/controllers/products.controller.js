import pool from "../config/db.js";

export const getProducts = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 20;
    const category = req.query.category;
    const cursor = req.query.cursor;
    let query = `SELECT * FROM products`;
    
    const conditions = [];
    const values = [];

    if (category) {
      values.push(category);
      conditions.push(`category = $${values.length}`);
    }

    if (cursor) {
        const { updated_at, id } = JSON.parse(Buffer.from(cursor, "base64").toString());
        values.push(updated_at);
        const p1 = values.length;

        values.push(updated_at);
        const p2 = values.length;

        values.push(id);
        const p3 = values.length;
        
        conditions.push(`
            (updated_at < $${p1}
            OR (
            updated_at = $${p2}
            AND id < $${p3}
            ))`);
        }

    if (conditions.length) {
        query += ` WHERE ${conditions.join(" AND ")}`;
    }

    query += ` ORDER BY updated_at DESC, id DESC LIMIT ${limit + 1}`;
    const result = await pool.query(query,values);
    const rows = result.rows;
    const hasNextPage = rows.length > limit;
    const products =rows.slice(0, limit);
    let nextCursor = null;
    if (hasNextPage) {
        const lastProduct = products[products.length - 1];
        nextCursor = Buffer.from(JSON.stringify({updated_at:lastProduct.updated_at,id: lastProduct.id,})).toString("base64");
    }

    return res.status(200).json({success: true,message:"Products fetched successfully",
      data: products,
      nextCursor,
      hasNextPage,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const AddNewProduct = async (req, res) => {
  try {
    const {name,category,price} = req.body;

    if (!name || !category || !price) {
      return res.status(400).json({success: false,message: "All fields are required"});
    }

    const result = await pool.query(`INSERT INTO products
      (name,category,price,created_at,updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *`,
      [name, category, price]
    );

    return res.status(201).json({
      success: true,message: "Product created successfully",data: result.rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};