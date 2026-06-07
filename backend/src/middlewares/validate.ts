import { type Request, type Response,type NextFunction } from "express";
import { type ZodObject, formatError } from "zod";


export const validate =
  (schema: ZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Validation error",
        errors: formatError,
      });
    }

    req.body = result.data;

    next();
  };