import { Request, Response, NextFunction } from "express";
import { Note, PrismaClient } from "@prisma/client";
import CustomResponse from "../../utils/handlers/response.handler";
import { IExtendedRequest } from "../../utils/types.util";
import CustomError from "../../utils/handlers/error.handler";

const create = async (req: Request, res: Response): Promise<any> => {
  try {
    let { title, content } = req.body;
    let userId = (req as IExtendedRequest).user.id;

    const note = new PrismaClient().note;

    // If no title or content is provided, throw an error
    if (!(title && content)) {
      throw new CustomError("Title and content are required!", 400);
    }

    // Create a new note
    const newNote: Note = await note.create({
      data: {
        title,
        content,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    if (!newNote) {
      throw new CustomError("Something went wrong!", 500);
    }

    // Return the new note
    return new CustomResponse(res).success("New note created!", newNote, 201);
  } catch (e: any) {
    return new CustomResponse(res, e).error(e.message, {}, e?.status, {});
  }
};
export default create;
