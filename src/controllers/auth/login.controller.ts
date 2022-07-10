import { Request, Response, RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { prisma } from "../../services/db";
import validator from "validator";
import { User } from "@prisma/client";
import { sign } from "../../utils/auth.util";
import CustomError from "../../utils/handlers/error.handler";
import CustomResponse from "../../utils/handlers/response.handler";
import config from "../../configs/env.config";

const login: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    try {
      let { identifier, password } = req.body;

      // Check that fields are not empty
      if (!(identifier && password)) {
        throw new CustomError("Please fill in all fields", 400);
      }

      // Check that email or username is valid
      if (!validator.isEmail(identifier) && !validator.isAscii(identifier)) {
        throw new CustomError("Invalid credentials!", 400);
      }

      identifier = identifier.toLowerCase();

      // Fetch user
      const user: User | null = await prisma.user.findFirst({
        where: {
          OR: [{ email: identifier }, { username: identifier }],
        },
      });

      // Check if user exists
      if (!user) {
        throw new CustomError("Invalid credentials!", 400);
      }

      // Check if password is correct
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new CustomError("Invalid credentials!", 400);
      }

      const token = await sign({ id: user.id });
      const cookie = `token=${token}; HttpOnly; Max-Age=${config.jwt.expiresIn}`;

      res.setHeader("Set-Cookie", cookie);
      return new CustomResponse(res).success(
        "Login successful!",
        {
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
          },
        },
        200,
        {}
      );
    } catch (e: any) {
      return new CustomResponse(res, e).error(e.message, {}, e?.status, {});
    }
  }
);

export default login;
