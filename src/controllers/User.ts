import { Response, Request } from "express";
import users from "../fixtures/users.json";
import { sign } from "jsonwebtoken";

class UsersController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = users.find((element) => element.email == email);
    const userPassword = users.find((element) => element.password == password);

    if (!user) {
      return res.status(400).json({ error: "Email not found!" });
    }

    if (!userPassword) {
      return res.status(400).json({ error: "Invalid Password!" });
    }

    const secretKey = process.env.SECRETKEY || "some_secret_key";
    const token = await sign(user.userId, secretKey);

    res.json({ token: token });
  }
}

export default UsersController;
