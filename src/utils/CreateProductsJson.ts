import { createReadStream, createWriteStream, readFileSync } from "fs";
import { resolve } from "path";
import { createInterface } from "readline";

async function getTotalLines(path: string): Promise<number> {
  const file = readFileSync("src/fixtures/products.txt", "utf-8");

  const totalLines = file.split("\n").length;

  return totalLines;
}

async function CreateProductsJson(txtFile: string) {
  const readStream = createReadStream(txtFile);
  const writeStream = createWriteStream("src/fixtures/products.json");

  const readline = createInterface({
    input: readStream,
    crlfDelay: Infinity,
  });

  var actualLine = 0;
  const totalLines = await getTotalLines(txtFile);
  console.log(totalLines);

  writeStream.write("[");

  for await (const line of readline) {
    actualLine++;
    writeStream.write(line);

    if (!(actualLine == totalLines)) {
      writeStream.write(",\n");
    }
  }
  writeStream.write("]");
  writeStream.end();
}

const txtFile = resolve("src/fixtures/products.txt");

CreateProductsJson(txtFile);
