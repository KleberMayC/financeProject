//CASO DER ERRO É PORQUE NA HORA DE MANDAR A MIGRATE PARA O BANCO O CAMPO "NOME" FOI COM "NAME" ENTÃO AQUI TO AJUSTANDO PARA "NAME"
//SE DER ERRO É SÓ TROCAR PARA "NOME" INVES DE "NAME"

"use client";
import { useState } from "react";
import axios from "axios";
import * as S from "./style";

export const CategoriasCreate = () => {
  const [name, setName] = useState();

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
  };

  const onSumbmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8080/categorias",
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotification({
        open: true,
        message: `Categoria ${name} criada com sucesso!`,
        severity: "success",
      });
    } catch (error) {
      console.log("error");
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
        <S.H1>Criar Categoria</S.H1>

        <S.TextField
          name="name"
          onChange={onChangeValue}
          label="Nome"
          variant="outlined"
          fullWidth
        />
        <S.Button variant="contained" color="success" type="submit">
          Criar!
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

export default CategoriasCreate;
