import { apiClient } from "../utils/axios";
import useAuth from "./useAuth";

const useRefreshTokens = () => {
  console.log("calling useRefreshTOkens");
  const { createUserSession, logout } = useAuth();

  const refreshTokens = async () => {
    console.log("NOW REFRESHING TOKENS");
    const response = await apiClient.post("/auth/refresh-tokens");
    console.log("REFRESH TOKEN RESPOSNE = ", response);
    const { user, accessToken } = response?.data;

    if (response.status === 200) {
      createUserSession(user, accessToken);
      return { user, accessToken };
    }
  };
  return refreshTokens;
};

export default useRefreshTokens;
