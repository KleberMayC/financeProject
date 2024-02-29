"use client";
import axios from "axios";
import { useEffect, useState } from "react";
// import { CategoriasCreate } from "../../../components/Categorias/CategoriasCreate";
import { CategoriasUpdate } from "../../../components/Categorias/CategoriasUpdate";
export const DashboardPage = () => {
  const [user, setUser] = useState({
    id: null,
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
    axios
      .get("http://localhost:8080/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data.data);
      })
      .catch((_) => {
        window.location.href = "/login";
      });
  }, []);
  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <CategoriasUpdate categoriaId={1} />
    </div>
  );
};

export default DashboardPage;
