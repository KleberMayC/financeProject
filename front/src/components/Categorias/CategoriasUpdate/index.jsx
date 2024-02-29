//CASO DER ERRO É PORQUE NA HORA DE MANDAR A MIGRATE PARA O BANCO O CAMPO "NOME" FOI COM "NAME" ENTÃO AQUI TO AJUSTANDO PARA "NAME"
//SE DER ERRO É SÓ TROCAR PARA "NOME" INVES DE "NAME"

"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import * as S from "./style";

export const CategoriasUpdate = ({ categoriaId }) => {
  const [name, setName] = useState();
  const [userId, setUserId] = useState();

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
  };

  useEffect(() => {
    const getCategoria = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8080/categorias/${categoriaId}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setName(response.data.data.name);
        setUserId(response.data.data.user_id);
      } catch (error) {
        setNotification({
          open: true,
          message: error.response.data.message,
          severity: "error",
        });
      }
    };
    getCategoria();
  }, [categoriaId]);

  const onSumbmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8080/categorias/${categoriaId}`,
        {
          name,
          user_id: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotification({
        open: true,
        message: `Categoria ${name} atualizada com sucesso!`,
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
        <S.H1>Atualizar Categoria</S.H1>

        <S.TextField
          name="name"
          onChange={onChangeValue}
          label="Nome"
          variant="outlined"
          value={name}
          fullWidth
        />
        <S.Button variant="contained" color="success" type="submit">
          Atualizar
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

export default CategoriasUpdate;
