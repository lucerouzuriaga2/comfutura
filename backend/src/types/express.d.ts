import { IAdminDocument } from "../models/Admin";

declare global {
  namespace Express {
    interface Request {
      admin?: IAdminDocument;
    }
  }
}
