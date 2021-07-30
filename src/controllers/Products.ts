import { createReadStream, writeFile } from "fs";
// import * as fs from "fs";
import { resolve } from "path";
import { createInterface } from "readline";

class ProductsController {
  async getAllProducts(req, res) {
    const path = resolve(__dirname, "../fixtures/products.txt");

    const fileStream = createReadStream(path);
    const rl = createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    let products = [];

    for await (const line of rl) {
      const a = JSON.parse(line);
      products.push(a);
    }

    res.send(products);
  }
}

export default ProductsController;
