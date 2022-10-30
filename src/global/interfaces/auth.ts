type Permission = "LEAD" | "MODERATOR" | "HEAD" | "CORE_MEMBER" | "MEMBER";

interface SigninBody {
  adminScholarId: string;
  adminPassword: string;
}

export { Permission, SigninBody };
