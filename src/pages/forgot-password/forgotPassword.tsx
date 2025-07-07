// import { Box, TextField, Typography, Button } from "@mui/material";
// import React, { useState } from "react";
// import { authApi } from "../../store/apis/axiosInstance";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");

//   const formSubmitHandler = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const resetData = {
//       requestType: "PASSWORD RESET",
//       email,
//     };

//     try {
//       await authApi.forgotPassword(resetData);
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   return (
//     <Box>
//       <Typography>Reset Your Password</Typography>

//       <form onSubmit={formSubmitHandler}>
//         <TextField
//           label="Email"
//           value={email}
//           helperText="Please Enter Your Registered Email"
//           variant="outlined"
//           required
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <Button type="submit">Send Email</Button>
//       </form>
//     </Box>
//   );
// };

// export default ForgotPassword;

import {
  Box,
  TextField,
  Typography,
  Button,
  Alert,
  Stack,
  useTheme,
  Link,
} from "@mui/material";
import React, { useState } from "react";
import { authApi } from "../../store/apis/axiosInstance";
import LockResetIcon from "@mui/icons-material/LockReset";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate();
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    const resetData = {
      requestType: "PASSWORD_RESET", // ✅ fixed typo
      email,
    };

    try {
      await authApi.forgotPassword(resetData);
      setSuccessMsg(
        "📧 If this email is registered, a reset link has been sent."
      );
      setEmail(""); // clear field
    } catch (err: any) {
      const errorMessage = err?.response?.data?.error?.message;
      if (errorMessage === "EMAIL_NOT_FOUND") {
        setErrorMsg("❌ This email is not registered.");
      } else {
        setErrorMsg("⚠️ Something went wrong. Try again later.");
      }
    }
  };

  const logInHandler = () =>{
      navigate("/")
  }

  return (
    <Box
      sx={{
        maxWidth: 600,
        width: 500,
        mx: "auto",
        mt: 8,
        px: 3,
        py: 4,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: theme.palette.background.paper,
      }}
    >
      <Stack spacing={3}>
        <Typography
          variant="h5"
          fontWeight={600}
          textAlign="center"
          color="primary"
        >
          <LockResetIcon sx={{ color: "orange", alignContent: "center" }} />{" "}
          Reset Your Password
        </Typography>

        {successMsg && <Alert severity="success">{successMsg}</Alert>}
        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <form onSubmit={formSubmitHandler}>
          <Stack spacing={2}>
            <TextField
              type="email"
              label="Email"
              value={email}
              variant="outlined"
              required
              fullWidth
              helperText="Enter your registered email"
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 1000px white inset",
                  WebkitTextFillColor: theme.palette.text.primary,
                },
              }}
            />
            <Button variant="contained" type="submit" color="primary" fullWidth>
              Send Reset Link
            </Button>
          </Stack>
        </form>

        <Link sx={{ cursor: "pointer", fontSize: "22px" }} onClick={logInHandler} >LogIn Page</Link>
      </Stack>
    </Box>
  );
};

export default ForgotPassword;
