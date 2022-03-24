import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { apiClient } from "../utils/axios";
import { getInitialPageForUserRole, roleRights, roles } from "../utils/roles";

const defaultValues = {
  user: null,
  setUser: () => null,
  accessToken: "",
  register: () => null,
  login: () => null,
  resetPassword: () => null,
  logout: () => null,
  isLoading: false,
  setIsLoading: () => null,
  isAuthenticated: false,
  createUserSession: () => null,
};

export const AuthContext = createContext(defaultValues);

function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = !!user;
  const [initialMount, setInitialMount] = useState(false);

  useEffect(() => {
    console.log("INITAL MOUNT");

    // Refresh the tokens if page is reloaded
    refreshTokens(() => setInitialMount(true));
    return () => {
      console.log("UNMOUNTING INITAIL MOUNT");
      setInitialMount(false);
    };
  }, []);

  // Run after initialMount
  useEffect(() => {
    // If page is 404 then skip checkAccess and disply 404 page
    if (router.pathname === "/_error") return;

    // Run only if initialMount is true
    if (initialMount) {
      console.log("running after initial mount is true");
      // Check access on user.type then refreshToken
      checkAccess(user?.type, refreshTokens);
    }
  }, [router.asPath, router.isReady, initialMount]);

  // Checks user role and allow to access only allowed routes
  const checkAccess = (userRole, cb) => {
    // On mount
    // Get allowed routes for user
    let allowedRoutes = roleRights.get(userRole);

    // If no allowedRoutes and user.type is undefined
    // basiclly if user is not logged in
    // then set user role as PUBLIC and rerun checkAcces
    if (!allowedRoutes && user?.type === undefined) {
      console.log("Running checkAccess again with PUBLIC user");
      checkAccess("PUBLIC", cb);
    } else if (allowedRoutes?.includes(router.pathname)) {
      // User is accessing allowed routes
      console.warn(
        `User type ${userRole} is allowed to access ${router.pathname}`
      );

      // if user role is other than public
      // run refreshToken
      if (userRole !== "PUBLIC") cb();
    } else {
      console.warn(
        `User type ${userRole} is NOT allowed to access ${router.pathname}`
      );

      // On reload of page
      if (isAuthenticated) {
        console.log("user is autenticated, going back");
        router.back();
      }

      cb();
    }
  };

  const createUserSession = (user, accessToken, redirectUrl) => {
    user && setUser(user);
    if (accessToken) {
      setAccessToken(accessToken);
      const bearer = `Bearer ${accessToken}`;
      apiClient.defaults.headers.Authorization = bearer;
    }
    redirectUrl && router.push(redirectUrl);
  };

  const clearUserSession = () => {
    setAccessToken("");
    setUser(null);
    setIsLoading(false);
  };

  const refreshTokens = async (cb) => {
    try {
      const response = await apiClient.post("/auth/refresh-tokens");
      const { user, accessToken } = response.data;

      if (user && accessToken) {
        createUserSession(user, accessToken);
      }
    } catch (err) {
      console.log("Refresh Token error on page mount");
      // if there is an error in refreshing tokens
      // and user is not authenticated
      // logout
      if (!isAuthenticated) {
        console.log("User is not authenticated so logging out");
        logout();
      } else {
        // if there is an error in refreshing tokens
        // and user is authenticated
        // go back
        console.log("user is authenticated so going back");
        router.back();
      }
    } finally {
      // No matter what, run callback (setInitialMount)
      cb && cb();
    }
  };

  const register = async (payload) => {
    const response = await apiClient.post("/auth/register", payload);
    const { user, accessToken } = response.data;

    if (user && accessToken) {
      createUserSession(
        user,
        accessToken,
        getInitialPageForUserRole(user?.type)
      );
    }
  };

  const login = async (credentials) => {
    const response = await apiClient.post("/auth/login", credentials);
    const { user, accessToken } = response.data;

    if (user && accessToken) {
      createUserSession(
        user,
        accessToken,
        getInitialPageForUserRole(user?.type)
      );
    }
  };

  const resetPassword = async (password, token) => {
    const response = await apiClient.post(
      `auth/reset-password?token=${token}`,
      {
        password,
      }
    );
    router.push("/login?flash=Password reset successfull. Please Login.");
  };

  const logout = async () => {
    await apiClient.post("/auth/logout");
    clearUserSession();
    router.push("/login");
  };

  const value = {
    user,
    setUser,
    accessToken,
    register,
    login,
    resetPassword,
    logout,
    isLoading,
    setIsLoading,
    isAuthenticated,
    createUserSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
