import { Request, Response } from "express";
import { Note, PrismaClient } from "@prisma/client";
import { IExtendedRequest } from "../../utils/types.util";
import CustomResponse from "../../utils/handlers/response.handler";
import CustomError from "../../utils/handlers/error.handler";

const del = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const userId = (req as IExtendedRequest).user.id;

    const noteModel = new PrismaClient().note;

    const note: Note | null = await noteModel.findFirst({
      where: {
        id: parseInt(id, 10),
        userId,
      },
    });

    if (note) {
      await noteModel.delete({
        where: {
          id: parseInt(id, 10),
        },
      });

      return new CustomResponse(res).success(
        "Note deleted successfully!",
        note,
        200
      );
    } else {
      throw new CustomError("Note not found!", 404);
    }
  } catch (e: any) {
    return new CustomResponse(res, e).error(e.message, {}, e?.status, {});
  }
};

export default del;
