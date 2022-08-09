import { Request, Response, NextFunction } from "express";

type projectExisits = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export { projectExisits };
