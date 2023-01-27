import { Prisma, ProjectStatus } from "@prisma/client";

const validateProjectStatus = (status: ProjectStatus) => {
  return (
    typeof status !== "string" ||
    Object.values(ProjectStatus).some((s) => s == status)
  );
};

const displayableMemberDetails: Prisma.ClubMemberArgs = {
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
