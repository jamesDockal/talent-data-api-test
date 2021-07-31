import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";

class UserMiddleware {
  providedLoginCredentials(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "To login you must provided a email and a password" });
    }

    next();
  }

  async isLogged(req: Request, res: Response, next: NextFunction) {
    // get the header authorization where the token must be
    const bearerHeader = req.headers["authorization"];

    //if there is no authorization header, it will return a error
    if (!bearerHeader) {
      return res.status(401).json({
        error:
          "Not Authorized, you must have authorization header with 'Bearer ...token'!",
      });
    }

    // separete the authauthorizationr header value into a array
    // header value must be "Bearer ...token"
    const splitedHeader = bearerHeader.split(" ");

    // return an error if there is no Bearer word or token
    if (splitedHeader.length < 2) {
      return res
        .status(400)
        .json({ error: "Token bad formated, it should be 'Bearer ...token'" });
    }

    // get the word "Bearer" and the token
    const [bearer, token] = splitedHeader;

    // if the bearer is no written Bearer return a error
    if (bearer !== "Bearer") {
      return res
        .status(400)
        .json({ error: "Token bad formated, it should be 'Bearer ...token" });
    }

    // validate the token
    try {
      const secretKey = process.env.SECRET_KEY || "some_secret_key";
      const userLevel = await verify(token, secretKey);
      console.log("user level", userLevel);

      res.locals.loggedUserLevel = userLevel;
      return next();
    } catch (e) {
      return res.status(400).json({ error: "Invalid Token" });
    }
  }
}

export default UserMiddleware;
