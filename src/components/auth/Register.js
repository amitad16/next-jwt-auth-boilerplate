import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import SimpleModal from "../SimpleModal";
import LoadingButton from "@mui/lab/LoadingButton";

import EmailVerification from "./EmailVerification";

import validate from "../../utils/validate";
import useAuth from "../../hooks/useAuth";
import { EMAIL_VERIFICATION_STATUS } from "../../utils/constants";
import { registerFormInitialValues } from "../../utils/initialValues";
import { register as registerValidation } from "../../utils/validations/auth";
import services from "../../utils/services";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function Register() {
  const [formData, setFormData] = useState(registerFormInitialValues);
  const [formError, setFormError] = useState("");
  const [showTnCModal, setShowTnCModal] = useState(false);
  const [successfullRegistration, setSuccessfullRegistration] = useState(false);
  const [emailVerificationStatus, setEmailVerificationStatus] = useState();
  const [flashMessage, setFlashMessage] = useState("");

  const { register, user, setUser, isLoading, setIsLoading, isAuthenticated } =
    useAuth();
  const router = useRouter();
  const privateApiClient = useAxiosPrivate();

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        if (router.isReady && router.query.token) {
          const token = router.query.token.toString();
          const res = await services(privateApiClient).verifyEmail(token);
          isAuthenticated && setUser(res.data.user);
          if (res.data?.user?.isEmailVerified) {
            setEmailVerificationStatus(EMAIL_VERIFICATION_STATUS.SUCCESS);
          }
        }
      } catch (err) {
        console.error(err);
        setEmailVerificationStatus(EMAIL_VERIFICATION_STATUS.FAIL);
      }
    };

    if (!user || !user.isEmailVerified) {
      confirmEmail();
    }

    if (router.isReady && router.query.flash) {
      setFlashMessage(router.query.flash.toString());
    }
  }, [router.isReady, user]);

  const handleResendMail = () => {};

  const handleChange = ({ target }) =>
    setFormData({
      ...formData,
      [target.name]: target.type === "checkbox" ? target.checked : target.value,
    });

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      setFormError("");

      const { error, value } = validate(registerValidation, formData);

      if (error) throw error;

      await register(value);
      setSuccessfullRegistration(true);
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
        <Grid container>
          {!!flashMessage && (
            <Alert severity="info" sx={{ width: "100%" }}>
              {flashMessage}
            </Alert>
          )}
        </Grid>
        {emailVerificationStatus ? (
          <EmailVerification
            emailVerificationStatus={emailVerificationStatus}
          />
        ) : (
          <>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {formError && <Alert severity="error">{formError}</Alert>}
                  {successfullRegistration && (
                    <Alert severity="success">
                      An email is sent&nbsp;&nbsp;
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={handleResendMail}
                      >
                        Resend Mail
                      </Button>
                    </Alert>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="acceptedTerms"
                        value="acceptedTerms"
                        color="primary"
                        value={formData.acceptedTerms}
                        onChange={handleChange}
                      />
                    }
                    label={
                      <>
                        Accept our{" "}
                        <Link href="/#terms-conditions">
                          <a onClick={() => setShowTnCModal(true)}>
                            Terms and Conditions
                          </a>
                        </Link>
                      </>
                    }
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
                Sign Up
              </LoadingButton>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    <a> Already have an account? Sign in</a>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </>
        )}
      </Box>

      <SimpleModal
        open={showTnCModal}
        title="Terms and Conditions"
        onClose={() => setShowTnCModal(false)}
      >
        <Box sx={{ height: "40rem" }}>
          <Typography variant="body1">
            These are terms and conditions.
          </Typography>
          <Button onClick={() => setShowTnCModal(false)}>Close</Button>
        </Box>
      </SimpleModal>
    </Container>
  );
}
