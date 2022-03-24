import { useEffect } from "react";
import { privateApiClient } from "../utils/axios";
import useAuth from "../hooks/useAuth";
import useRefreshTokens from "./useRefreshTokens";

const useAxiosPrivate = () => {
  const { logout, accessToken, user } = useAuth();
  const refreshTokens = useRefreshTokens();

  useEffect(() => {
    const requestIntercept = privateApiClient.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = privateApiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        // Do not do anything if status is any other than 401
        if (error?.response?.status !== 401) {
          return Promise.reject(error);
        }

        // Duplicate the same request for future use
        const prevReq = error?.config;

        // Check if previous request is already sent from here
        // If sent logout
        if (prevReq?.sent) {
          logout();
          return Promise.reject(error);
        }

        try {
          prevReq.sent = true;

          // Generate tokens
          const { user, accessToken } = await refreshTokens();

          // Set Bearer token
          const bearer = `Bearer ${accessToken}`;
          prevReq.headers.Authorization = bearer;

          // Resend request with new headers
          return privateApiClient(prevReq);
        } catch (error) {
          logout();
          return Promise.reject(error);
        }
      }
    );

    return () => {
      privateApiClient.interceptors.request.eject(requestIntercept);
      privateApiClient.interceptors.response.eject(responseIntercept);
    };
  }, [user, refreshTokens, logout]);

  return privateApiClient;
};

export default useAxiosPrivate;
