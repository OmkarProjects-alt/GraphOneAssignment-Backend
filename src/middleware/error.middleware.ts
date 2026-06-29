import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { AppError } from "../utils/error";

export const errorMiddleware = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      data: null,
      meta: null,
      error: {
        code: error.code,
        message: error.message,
      },
    });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      data: null,
      meta: null,
      error: {
        code: "VALIDATION_ERROR",
        message: "Validation failed",
        details: error.flatten(),
      },
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {

    if (error.code === "P2002") {
      return res.status(409).json({
        data: null,
        meta: null,
        error: {
          code: "CONFLICT",
          message: "Resource already exists.",
        },
      });
    }

    if (error.code === "P2025") {
      return res.status(404).json({
        data: null,
        meta: null,
        error: {
          code: "NOT_FOUND",
          message: "Resource not found.",
        },
      });
    }
  }

  console.error(error);

  return res.status(500).json({
    data: null,
    meta: null,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong.",
    },
  });
};