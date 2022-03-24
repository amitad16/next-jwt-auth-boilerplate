import Alert from "@mui/material/Alert";

import { EMAIL_VERIFICATION_STATUS } from "../../utils/constants";

export default function EmailVerification({ emailVerificationStatus }) {
  return emailVerificationStatus === EMAIL_VERIFICATION_STATUS.SUCCESS ? (
    <Alert severity="success">Your email is verified</Alert>
  ) : emailVerificationStatus === EMAIL_VERIFICATION_STATUS.FAIL ? (
    <Alert severity="error">Your email cannot be verified</Alert>
  ) : (
    ""
  );
}
