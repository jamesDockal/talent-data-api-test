import { Router } from "express";
import UsersController from "../controllers/User";
import UserMiddleware from "../middlewares/Users";

const userRouter = Router();

const { login } = new UsersController();

const { providedLoginCredentials } = new UserMiddleware();

// route to login
userRouter.post("/login", providedLoginCredentials, login);

export default userRouter;
