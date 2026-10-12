import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

// Checks req.body against a Zod schema before the controller runs.
// Bad data → parse throws a ZodError → error.middleware sends 400.
// Good data → req.body is replaced with the clean data (extra fields removed).
export const validate =
  (schema: ZodType) =>
  (req: Request, res: Response, next: NextFunction) => {
    req.body = schema.parse(req.body);
    next();
  };
