"use client";
import { useState } from "react";
import axios from "axios";
import * as S from "./style";

export const LoginForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const onSumbmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.data.token);
      setNotification({
        open: true,
        message: `Usuario ${email} autenticado ixtepô`,
        severity: "success",
      });
    } catch (error) {
      setNotification({
        open: true,
        message: error.response.data.error,
        severity: "error",
      });
    }
  };

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setNotification({
      open: false,
      message: "",
      severity: "",
    });
  };
  return (
    <>
      <S.Form onSubmit={onSumbmit}>
        <S.H1>Login Form</S.H1>

        <S.TextField
          name="email"
          onChange={onChangeValue}
          label="E-mail"
          variant="outlined"
          fullWidth
        />
        <S.TextField
          name="password"
          onChange={onChangeValue}
          type="password"
          label="Senha"
          variant="outlined"
          fullWidth
        />
        <S.Button variant="contained" color="success" type="submit">
          enviares
        </S.Button>
      </S.Form>
      <S.Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <S.Alert
          variant="filled"
          onClose={handleClose}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </S.Alert>
      </S.Snackbar>
    </>
  );
};

export default LoginForm;
