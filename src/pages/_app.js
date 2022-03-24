import { CssBaseline } from "@mui/material";
import AuthProvider from "../contexts/AuthContext";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;
