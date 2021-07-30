import { Request, Response } from "express";
import allProducts from "../products.json";
import allOrganizations from "../fixtures/organization.json";

class ProductsController {
  async getAllProducts(req: Request, res: Response) {
    res.json(allProducts);
  }

  async getProductsByOrganizationNameAndTags(req: Request, res: Response) {
    const { organizationName } = req.params;
    console.log("organizationName", organizationName);

    // getting that tags of the query
    const tagsQuery = req.query.tags;
    if (!tagsQuery) {
      return res.status(400).json({
        error: "No tag query provided!",
      });
    }

    // getting that tags that was given
    const tags = tagsQuery.toString().split(",");

    // return res.json({ tags, a: tags.length });
    // if it was provided a organization that doesnt exists
    const organization = allOrganizations.find(
      (organization) => organization.name == organizationName
    );
    if (!organization) {
      return res.status(404).json({
        error: `Organization '${organizationName}' not found!`,
      });
    }

    // search products of the given organization name
    const products = allProducts.filter(
      (product) => product.department == organizationName
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
