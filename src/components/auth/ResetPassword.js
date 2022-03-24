import { useState } from "react";
import { useRouter } from "next/router";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";

import validate from "../../utils/validate";
import useAuth from "../../hooks/useAuth";
import { resetPasswordFormInitialValues } from "../../utils/initialValues";
import { resetPassword as resetPasswordValidation } from "../../utils/validations/auth";

export default function ResetPassword() {
  const [formData, setFormData] = useState(resetPasswordFormInitialValues);
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const { resetPassword } = useAuth();

  const handleChange = ({ target }) =>
    setFormData({
      ...formData,
      [target.name]: target.value,
    });

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setFormError("");
      setIsLoading(true);

      const { error, value } = validate(resetPasswordValidation, formData);
      if (error) throw error;

      await resetPassword(value.password, router.query.token.toString());
      setSuccess(true);
    } catch (err) {
      if (typeof err === "string") setFormError(err);
      else setFormError(err?.response?.data?.err);
    } finally {
      setIsLoading(false);
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
          Reset Password
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {formError && <Alert severity="error">{formError}</Alert>}
              {success && (
                <Alert severity="success">
                  Password Reset successfull. Redirecting to login
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                type={"password"}
                required
                fullWidth
                autoFocus
                id="password"
                label="New Password"
                name="password"
                autoComplete="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type={"password"}
                required
                fullWidth
                autoFocus
                id="confirmPassword"
                label="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={isLoading}
          >
            Reset Password
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
}
