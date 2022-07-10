import { Request, Response } from "express";
import { Note, PrismaClient } from "@prisma/client";
import { IExtendedRequest } from "../../utils/types.util";
import CustomResponse from "../../utils/handlers/response.handler";
import CustomError from "../../utils/handlers/error.handler";

const all = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = (req as IExtendedRequest).user.id;

    const notes: Note[] = await new PrismaClient().note.findMany({
      where: {
        userId,
      },
    });

    if (notes.length === 0) {
      throw new CustomError("No notes found!", 404);
    }

    return new CustomResponse(res).success("Fetched all notes", notes, 200, {});
  } catch (e: any) {
    console.log(e);
    return new CustomResponse(res, e).error(e?.message, {}, e?.status, {});
  }
};

const one = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = (req as IExtendedRequest).user.id;
    const { id } = req.params;

    const noteId: number = parseInt(id, 10);

    const note: Note | null = await new PrismaClient().note.findFirst({
      where: {
        id: noteId,
        userId,
      },
    });

    if (!note) {
      throw new CustomError("Note not found!", 404);
    }

    return new CustomResponse(res).success("Fetched one note", note, 200, {});
  } catch (e: any) {
    return new CustomResponse(res, e).error(e?.message, {}, e?.status, {});
  }
};

const fetch = {
  all,
  one,
};

export default fetch;
