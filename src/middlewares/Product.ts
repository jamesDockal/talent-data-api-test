import { Response, Request, NextFunction } from "express";
import allOrganizations from "../fixtures/organization.json";

class ProductMiddleware {
  // see if the user has access to organization
  // and save the organization to the locals
  userHasAccessToTheProducts(req: Request, res: Response, next: NextFunction) {
    const { organizationName } = req.params;
    // the loggedUserLevel was setted in the middleware User(isLogged)
    const { loggedUserLevel } = res.locals;

    if (loggedUserLevel == "intern" && organizationName !== "STUFF A") {
      return res.status(403).json({
        error: `As an internet you only have access to organization 'STUFF A'!`,
      });
    }

    // see if the organization exists
    const organization = allOrganizations.find(
      (organization) => organization.name == organizationName.toString()
    );
    if (!organization) {
      return res.status(404).json({
        error: `Organization '${organizationName}' not found!`,
      });
    }

    res.locals.organization = organization;

    const userLevels = {
      senior: [0, 1, 2],
      middle: [1, 2],
      junior: [2],
      intern: [0, 1, 2],
    };

    // verify if the user has access to the organization that he's trying to access
    const hasAccess = userLevels[loggedUserLevel].filter(
      (userLevel) => organization.level == userLevel
    );
    if (!hasAccess.length) {
      return res.status(403).json({
        error: `You dont have access to this organization!`,
      });
    }

    return next();
  }
}

export default ProductMiddleware;
