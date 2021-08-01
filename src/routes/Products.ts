import { Router } from "express";
import ProductsController from "../controllers/Products";
import ProductMiddleware from "../middlewares/Product";
import UserMiddleware from "../middlewares/Users";

const productsRouter = Router();

const { getAllProducts, getProductsByOrganizationNameAndTags } =
  new ProductsController();

// middlewares
const { isLogged } = new UserMiddleware();
const { userHasAccessToTheProducts } = new ProductMiddleware();

// route to get all products
productsRouter.get("/", getAllProducts);

// route to get the products with an organization's name and the tags of the products
productsRouter.get(
  "/:organizationName",
  isLogged,
  userHasAccessToTheProducts,
  getProductsByOrganizationNameAndTags
);

export default productsRouter;
