import { ProjectStatus } from "@prisma/client";

const validateProjectStatus = (status: ProjectStatus) => {
  return Object.values(ProjectStatus).some((s) => s == status);
};

const displayableMemberDetails = {
  select: {
    scholarId: true,
    image: true,
    githubUrl: true,
    facebookUrl: true,
    student: {
      select: {
        person: {
          select: {
            firstName: true,
            lastName: true,
            middleName: true,
          },
        },
      },
    },
  },
};

export { validateProjectStatus, displayableMemberDetails };
