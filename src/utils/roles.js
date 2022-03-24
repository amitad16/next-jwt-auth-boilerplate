const ROLES = {
  ADMIN: ["/admin", "/admin/show"],
  MEMBER: ["/welcome", "/welcome/show"],
  PUBLIC: ["/login", "/register", "/forgot-password", "/reset-password"],
};

export const roles = Object.keys(ROLES);
export const roleRights = new Map(Object.entries(ROLES));
export const getInitialPageForUserRole = (userRole) => {
  switch (userRole) {
    case "ADMIN":
      return "/admin";
    case "MEMBER":
      return "/welcome";
    case "PUBLIC":
      return "/login";
    default:
      return "/login";
  }
};
