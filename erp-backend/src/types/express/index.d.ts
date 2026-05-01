import { UserPayloadType } from "user";


declare global {
  namespace Express {
    interface Request {
      user?: UserPayloadType;
    }
  }
}
