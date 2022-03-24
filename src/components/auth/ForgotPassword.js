import { useState } from "react";
import Link from "next/link";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";

import AlertModal from "../AlertModal";

import { forgotPasswordFormInitialValues } from "../../utils/initialValues";
import services from "../../utils/services";
import validate from "../../utils/validate";
import { forgotPassword as forgotPasswordValidation } from "../../utils/validations/auth";
import { apiClient } from "../../utils/axios";

export default function ForgotPassword() {
  const [formData, setFormData] = useState(forgotPasswordFormInitialValues);
  const [formError, setFormError] = useState("");
  const [isResend, setIsResend] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = ({ target }) =>
    setFormData({
      ...formData,
      [target.name]: target.value,
    });

  const handleSubmit = async (event) => {
    try {
      event?.preventDefault();
      if (isResend) return;
      setFormError("");

      const { error, value } = validate(forgotPasswordValidation, formData);

      if (error) throw error;

      await services(apiClient).forgotPasswordAPI(value.email);
      console.log("hiii");
      setShowAlert(true);
    } catch (err) {
      if (typeof err === "string") setFormError(err);
      else setFormError(err?.response?.data?.err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {formError && <Alert severity="error">{formError}</Alert>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                autoFocus
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Send Email
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                <a>I remember my password.</a>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {showAlert && (
        <AlertModal
          icon="email-large"
          title="Reset your password"
          open={showAlert}
          onClose={() => setShowAlert(false)}
        >
          <Divider />
          <Typography variant="body1">
            We sent a password reset email to {formData.email}. Click the link
            inside to get started!
          </Typography>

          <Divider />
          <Button
            onClick={() => {
              handleSubmit();
              setIsResend(true);
            }}
          >
            {isResend ? "Email sent!" : "Email didn't arrive?"}
          </Button>
        </AlertModal>
      )}
    </Container>
  );
}
