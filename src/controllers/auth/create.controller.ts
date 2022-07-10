import { Request, Response, RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { prisma } from "../../services/db";
import validator from "validator";
import { User } from "@prisma/client";
import CustomError from "../../utils/handlers/error.handler";
import CustomResponse from "../../utils/handlers/response.handler";

const create: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    try {
      let { username, email, password, confirmPassword } = req.body;

      // If username, email or password is not provided, throw error
      if (!(username && email && password && confirmPassword)) {
        throw new CustomError("All fields are required", 400);
      }

      username = username.trim().toLowerCase();
      email = email.trim().toLowerCase();
      password = password.trim();
      confirmPassword = confirmPassword.trim();

      // Check if email is valid
      if (!validator.isEmail(email)) {
        throw new CustomError("Email is invalid", 400);
      }

      // Check if password is at least 6 characters long
      if (password.length < 6) {
        throw new CustomError(
          "Password must be at least 6 characters long",
          400
        );
      }

      // Check if username is at least 3 characters long and is ASCII
      if (!validator.isAscii(username) || username.length < 3) {
        throw new CustomError("Username is invalid!", 400);
      }

      // Check if passwords match
      if (password !== confirmPassword) {
        throw new CustomError("Passwords do not match", 400);
      }

      // Check if username is already taken
      const checkUsername: number = await prisma.user.count({
        where: {
          username,
        },
      });

      if (checkUsername > 0) {
        throw new CustomError("Username is already taken", 400);
      }

      // Check if email is already taken
      const checkEmail: number = await prisma.user.count({
        where: {
          email,
        },
      });

      if (checkEmail > 0) {
        throw new CustomError("Email is already registered!", 400);
      }

      const hashedPassword: string = await bcrypt.hash(password, 10);

      const user: User = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

      if (!user) {
        throw new CustomError("User could not be created", 400);
      }

      return new CustomResponse(res).success(
        "User created successfully",
        { id: user.id, username: user.username, email: user.email },
        201,
        {}
      );
    } catch (e: any) {
      return new CustomResponse(res, e).error(e.message, {}, e.status);
    }
  }
);

export default create;
