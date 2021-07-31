import { createReadStream, createWriteStream } from "fs";
import { createInterface } from "readline";

async function CreateProductsJson() {
  const readStream = createReadStream("src/fixtures/products.txt");
  const writeStream = createWriteStream("src/fixtures/products.json");

  const readline = createInterface({
    input: readStream,
    crlfDelay: Infinity,
  });

  var actualLine = 0;

  writeStream.write("[");
  for await (const line of readline) {
    actualLine++;

    writeStream.write(line);

    if (actualLine == 1500) {
    } else {
      writeStream.write(",\n");
    }
  }
  writeStream.write("]");

  writeStream.end();
}

CreateProductsJson();
