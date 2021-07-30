import { Response, Request, NextFunction } from "express";

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
}

export default UserMiddleware;
