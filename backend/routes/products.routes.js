import { Router } from "express";
import { getProducts,AddNewProduct } from "../controllers/products.controller.js";

const router = Router();

router.get("/", getProducts);
router.post("/add", AddNewProduct);

export default router;