import { Branch, Degree } from "@prisma/client";

interface RegisterBody {
  scholarId: string;
  personalEmailId: string;
  instituteEmailId: string;
  branch: Branch;
  degree: Degree;
}

export { RegisterBody };
