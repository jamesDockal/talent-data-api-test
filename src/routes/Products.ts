import { Router } from "express";
import ProductsController from "../controllers/Products";

const productsRouter = Router();

const { getAllProducts } = new ProductsController();

productsRouter.get("/", getAllProducts);

export default productsRouter;
