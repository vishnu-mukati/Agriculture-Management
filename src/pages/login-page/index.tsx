import {
  Box,
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { authApi } from "../../store/apis/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Login } from "../../store/slices/authSlice";
import CircularProgress from "@mui/material/CircularProgress";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const returnSecureToken = selectCurrentToken;
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };


  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      email,
      password,
      returnSecureToken: true,
    };

    try {
      if (isLogin) {
        if (password !== confirmPassword) {
          alert("password does not match");
          setIsLoading(false);
          return;
        }
        const result = await authApi.signUp(data);
        dispatch(
          Login({
            user: data,
            token: result.data.idToken,
            isLogin: true,
          })
        );

        navigate("/");
      } else {
        const response = await authApi.signIn(data);
        dispatch(
          Login({
            user: data,
            token: response.data.idToken,
            isLogin: true,
          })
        );

        if (!response.data.idToken) {
          alert("Signup failed. Please check your credentials.");
          return;
        }
        navigate("/");
      }
    } catch (err: any) {
      alert(`'Failed to login',${err.response?.data?.error?.message}`);
    }

    navigate("/");
  };

  const toggleButtonHandler = () => {
    setIsLogIn((prev) => !prev);
  };

  const forgotPasswordHandler = () =>{
     navigate("/forgotPassword");
  }

  return (
    <Paper
      elevation={6}
      sx={{
        width: "400px",
        bgcolor: "offwhite",
        minHeight: "300px",
        padding: "32px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        {!isLogin ? "Login Page" : "SignUp Page"}
      </Typography>
      <Box component="form" onSubmit={formSubmitHandler}>
        <Stack spacing={2} direction="column">
          <TextField
            label="Email"
            sx={{ bgcolor: "white" }}
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="password"
            variant="outlined"
            required
            type={showPassword ? "text" : "password"}
            // color="primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {isLogin && (
            <TextField
              label="confirm password"
              variant="outlined"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}

          {!isLoading && isLogin ? (
            isLoading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <Button
                type="submit"
                variant="contained"
                sx={{ bgcolor: "#1976d2", color: "#fff" }}
                fullWidth
                color="secondary"
              >
                SignUp
              </Button>
            )
          ) : isLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: "#1976d2", color: "#fff" }}
              fullWidth
              color="secondary"
            >
              LogIn
            </Button>
          )}
        </Stack>
        {!isLogin && (
        <Typography sx={{ cursor: "pointer", p: "12px" }}>
            <Link onClick={forgotPasswordHandler} sx={{ cursor: "pointer", color: "primary" }}>
              ForgotPassword
            </Link>
        </Typography>
        )}
        <Typography sx={{ cursor: "pointer", p: "12px" }}>
          {!isLogin ? "Don't have an account?" : "Have an account?"}
          <Link sx={{ padding: "12px" }} onClick={toggleButtonHandler}>
            {isLogin ? "logIn" : "SignUp"}
          </Link>
        </Typography>
      </Box>
    </Paper>
  );
};
