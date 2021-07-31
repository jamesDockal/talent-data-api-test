import { Router } from "express";
import ProductsController from "../controllers/Products";
import ProductMiddleware from "../middlewares/Product";
import UserMiddleware from "../middlewares/Users";

const productsRouter = Router();

const { getAllProducts, getProductsByOrganizationNameAndTags } =
  new ProductsController();

const { isLogged } = new UserMiddleware();
const { userHasAccessToTheProducts } = new ProductMiddleware();

productsRouter.get("/", getAllProducts);
productsRouter.get(
  "/:organizationName",
  isLogged,
  userHasAccessToTheProducts,
  getProductsByOrganizationNameAndTags
);

export default productsRouter;
