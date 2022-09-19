//React
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//Services
import AuthService from "../../services/auth/authService";

//Types
import { User } from "../../Types.d";

//Material
import { Alert, Box, Button, TextField } from "@mui/material";

//Styles
import "./Login.css";

interface LoginState {
  error: boolean;
}
const Login = () => {
  const [email, setEmail] = useState<User["email"]>("");
  const [password, setPassword] = useState<User["password"]>("");
  const [errorMessage, setErrorMessage] = useState<LoginState["error"]>(false);

  const navigate = useNavigate();

  const handleLogin = async (
    e: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      await AuthService.login(email, password).then(
        () => {
          if (errorMessage) {
            setErrorMessage(!errorMessage);
          }
          navigate("/home");
          window.location.reload();
        },
        (err) => {
          console.log(err);
          setErrorMessage(!errorMessage);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box className="login__container">
      <form onSubmit={handleLogin} className="login__form">
        <h3>Login</h3>
        <TextField
          id="email"
          className="login__form_input"
          type="email"
          label="Email"
          variant="filled"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          id="password"
          className="login__form_input"
          type="password"
          label="Password"
          variant="filled"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errorMessage && (
          <Alert severity="error">
            Incorrect Email or Password please Try Again
          </Alert>
        )}
        <Button type="submit" variant={"contained"}>
          Log in
        </Button>
      </form>
    </Box>
  );
};

export default Login;
