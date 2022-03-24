export default function services(apiClient) {
  return {
    dummy() {
      return apiClient.post("auth/dummy");
    },

    forgotPasswordAPI(email) {
      return apiClient.post("auth/forgot-password", { email });
    },

    sendEmailVerification(isRegistration) {
      return apiClient.post(
        `auth/send-email-verification?isRegistration=${isRegistration}`
      );
    },

    verifyEmail(token) {
      return apiClient.post(`auth/verify-email?token=${token}`);
    },

    refreshTokens() {
      return apiClient.post("/auth/refresh-tokens");
    },
    logout() {
      return apiClient.post("/auth/logout");
    },
  };
}
