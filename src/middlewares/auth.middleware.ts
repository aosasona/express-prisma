import { PrismaClient, User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { verify } from "../utils/auth.util";
import CustomError from "../utils/handlers/error.handler";
import CustomResponse from "../utils/handlers/response.handler";

interface IVerData {
  id: string;
  [key: string]: any;
}

interface IExtendedRequest extends Request {
  user: User;
}

const authMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const Authorization =
        req.cookies["Authorization"] ||
        req?.header("Authorization")?.split("Bearer ")[1] ||
        null;

      if (Authorization) {
        const User = new PrismaClient().user;

        const verificationData = (await verify(Authorization)) as IVerData;

        const userId: number = parseInt(verificationData.id, 10);

        const currentUser = await User.findUnique({
          where: {
            id: userId,
          },
        });

        if (currentUser) {
          (req as IExtendedRequest).user = currentUser;
          next();
        } else {
          throw new CustomError("Invalid credentials!", 400);
        }
      } else {
        throw new CustomError("Invalid credentials!", 400);
      }
    } catch (e: any) {
      return new CustomResponse(res, e).error(e.message, {}, e?.status, {});
    }
  }
);

export default authMiddleware;
