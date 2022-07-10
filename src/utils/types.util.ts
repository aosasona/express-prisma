import { User } from "@prisma/client";
import { Request } from "express";

export interface IVerData {
  id: string;
  [key: string]: any;
}

export interface IExtendedRequest extends Request {
  user: User;
}
