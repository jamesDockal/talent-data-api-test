import express from "express";
import productsRouter from "./routes/Products";
import userRouter from "./routes/User";

const app = express();

app.use(express.json());

// CreateProductsJson();

app.use("/products", productsRouter);
app.use("/users", userRouter);

export default app;
