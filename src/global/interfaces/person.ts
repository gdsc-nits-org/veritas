import { Gender } from "@prisma/client";

interface RegisterBody {
  personalEmailId: string;
  gender: Gender;
  firstName: string;
  middleName?: string;
  lastName?: string;
  phoneNumber: string[];
  dateOfBirth: string | number;
}

export { RegisterBody };
