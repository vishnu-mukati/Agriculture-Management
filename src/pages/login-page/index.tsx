import {
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

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const returnSecureToken = selectCurrentToken;
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogIn] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

    const formSubmitHandler = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        let response;
        if (!isLogin) {
          response = await authApi.signIn({
            email,
            password,
            returnSecureToken: true,
          });
        } else {
          response = await authApi.signUp({
            email,
            password,
            returnSecureToken: true,
          });
          if(password !== confirmPassword){
            alert('password does not match')
            return;
          }

        }
        console.log(response);
      } catch (error) {
        alert(error);
      }
    };

  const toggleButtonHandler = () => {
    setIsLogIn((prev) => !prev);
  };

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
      <Typography variant="h4" color="" gutterBottom>
        {!isLogin ? "Login Page" : "SignUp Page"}
      </Typography>
      <form onSubmit={formSubmitHandler}>
        <Stack spacing={2} direction="column">
          <TextField
            label="Email"
            sx={{ bgcolor: "light" }}
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            color="primary"
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <Button
            type="submit"
            variant="contained"
            sx={{ bgcolor: "#1976d2", color: "#fff" }}
            fullWidth
            color="secondary"
          >
            {!isLogin ? "LogIn" : "SignUp"}
          </Button>
        </Stack>
        {!isLogin && (
          <Stack padding="12px">
            <Link sx={{ cursor: "pointer", color: "primary" }}>
              ForgotPassword
            </Link>
          </Stack>
        )}
        <Typography sx={{ cursor: "pointer", p: "12px" }}>
          {!isLogin ? "Don't have an account?" : "Have an account?"}
          <Link sx={{ padding: "12px" }} onClick={toggleButtonHandler}>
            {isLogin ? "logIn" : "SignUp"}
          </Link>
        </Typography>
      </form>
    </Paper>
  );
};
