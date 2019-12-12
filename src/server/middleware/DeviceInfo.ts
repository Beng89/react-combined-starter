import { RequestHandler } from "express-serve-static-core";
import * as MobileDetect from "mobile-detect"

declare global {
  namespace Express {
    interface Request {
      isMobile(): boolean
    }
  }
}

export const useDeviceInfo: () => RequestHandler =
  () => (req, res, next) => {
    var detector = new MobileDetect(req.header("user-agent") || "");

    req.isMobile = () => typeof detector.mobile() === "string"

    next();
  }