import * as express from "express";
import productsRouter from "./routes/Products";

const app = express();

app.use("/products", productsRouter);

export default app;
