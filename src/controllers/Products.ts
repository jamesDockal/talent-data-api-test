import { createReadStream, readFile, readFileSync } from "fs";
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
      products.push(JSON.parse(line));
    }

    res.send(products);
  }
}

export default ProductsController;
