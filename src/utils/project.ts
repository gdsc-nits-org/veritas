import { ProjectStatus } from "@prisma/client";

const validateProjectStatus = (status: ProjectStatus) => {
  return Object.values(ProjectStatus).some((s) => s == status);
};
export { validateProjectStatus };
