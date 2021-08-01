import { Response, Request } from "express";
import users from "../fixtures/users.json";
import { sign } from "jsonwebtoken";

class UsersController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    // see if there is a user with the provided email
    const user = users.find((element) => element.email == email);
    if (!user) {
      return res.status(400).json({ error: "User not found!" });
    }

    // verify if the password is correct
    if (user.password != password) {
      return res.status(400).json({ error: "Invalid Password!" });
    }

    // create the token using the role as info
    const secretKey = process.env.SECRETKEY || "some_secret_key";
    const token = await sign(user.roles[0], secretKey);

    res.json({ token: token });
  }
}

export default UsersController;
