import { Request, Response } from "express";
import { Note, PrismaClient } from "@prisma/client";
import { IExtendedRequest } from "../../utils/types.util";
import CustomResponse from "../../utils/handlers/response.handler";
import CustomError from "../../utils/handlers/error.handler";

const update = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = (req as IExtendedRequest).user.id;
    const { id } = req.params;
    let { title, content } = req.body;

    if (!title && !content) {
      throw new CustomError("No data to update!", 400);
    }

    const noteId: number = parseInt(id, 10);

    let note: Note | null = await new PrismaClient().note.findFirst({
      where: {
        id: noteId,
        userId,
      },
    });

    if (!note) {
      throw new CustomError("Note not found!", 404);
    }

    if (title) {
      note.title = title;
    }

    if (content) {
      note.content = content;
    }

    const updateNote = await new PrismaClient().note.update({
      where: {
        id: noteId,
      },
      data: {
        title: note.title,
        content: note.content,
      },
    });

    if (!updateNote) {
      throw new CustomError("Note not updated!", 400);
    }

    return new CustomResponse(res).success(
      `Updated note ${note.id}`,
      updateNote,
      200,
      {}
    );
  } catch (e: any) {
    return new CustomResponse(res, e).error(e?.message, {}, e?.status, {});
  }
};

export default update;
