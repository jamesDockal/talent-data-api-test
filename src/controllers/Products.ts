import { Request, Response } from "express";
import allProducts from "../products.json";
import allOrganizations from "../fixtures/organization.json";

class ProductsController {
  async getAllProducts(req: Request, res: Response) {
    res.json(allProducts);
  }

  async getProductsByOrganizationNameAndTags(req: Request, res: Response) {
    // getting that tags of the query
    const tagsQuery = req.query.tags;
    if (!tagsQuery) {
      return res.status(400).json({
        error: "No tags query provided!",
      });
    }

    // if it was given more than 1 tags
    const tags = tagsQuery.toString().split(",");

    // the organization was get in the middleware userHasAccessToTheProducts
    const { organization } = res.locals;

    // search products of the given organization name
    const products = allProducts.filter(
      (product) => product.department == organization.name
    );

    // run all the products to see if the tags of each product has any of the given tags
    // and return the products that has
    // run all products
    const productsWithTheTag = products.filter((product) => {
      // run in all the tags of the product

      for (const productTag of product.tags) {
        // run all the given query tag
        for (const queryTag of tags) {
          // see if the given query tag exist on product tags
          if (queryTag == productTag) {
            // return res.json({ product });
            return true;
          }
        }
      }
    });

    return res.json({
      total: productsWithTheTag.length,
      products: productsWithTheTag,
    });
  }
}

export default ProductsController;
