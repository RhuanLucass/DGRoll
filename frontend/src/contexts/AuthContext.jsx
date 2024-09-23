import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({
    error: false,
    content: "",
  });
  const [updateFlag, setUpdateFlag] = useState(false);


  const navigate = useNavigate();

  const registerUser = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/CadastrarUsuario",
        userData
      );
      setMessage({
        error: false,
        content: response.data.message,
      });
      setTimeout(() => {
        setMessage({ error: false, content: "" });
      }, 1500);
      return true;
    } catch (error) {
      setMessage({
        error: true,
        content: error.response?.data?.error || "Erro ao cadastrar usuário!",
      });
      setTimeout(() => {
        setMessage({ error: false, content: "" });
      }, 1500);
      return false;
    }
  };

  const loginUser = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/LoginUsuario",
        userData
      );
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setUser(response.data.user);
      setMessage({
        error: false,
        content: "",
      });
      return true;
    } catch (error) {
      setMessage({
        error: true,
        content: error.response?.data?.error || "Erro ao realizar login!",
      });
      return false;
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const logged = localStorage.getItem("user");
    if (logged) {
      setUser(JSON.parse(logged));
    }
  }, [navigate]);

  const uploadFile = async (file, title, id) => {
    if (!file) {
      setMessage({ error: true, content: "Por favor, selecione uma ficha!" });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("id_user", id);

    try {
      await axios.post("http://localhost:3000/api/AdicionarFicha", formData);

      setMessage({ error: false, content: "Ficha cadastrada com sucesso!" });
      setTimeout(() => {
        setMessage({ error: false, content: "" });
      }, 1500);
      return true;
    } catch (error) {
      console.error("Erro ao enviar o ficha:", error);
      setMessage({
        error: true,
        content: error.response?.data?.error || "Erro ao enviar o ficha!",
      });
      setTimeout(() => {
        setMessage({ error: false, content: "" });
      }, 1500);
      return false;
    }
  };

  const deleteSheet = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/DeletarFicha/${id}`);
      setMessage({ error: false, content: "Ficha deletada com sucesso!" });
      setTimeout(() => {
        setMessage({ error: false, content: "" });
      }, 1500);
      return true;
    } catch (error) {
      setMessage({
        error: true,
        content: error.response?.data?.error || "Erro ao deletar ficha!",
      });
      setTimeout(() => {
        setMessage({ error: false, content: "" });
      }, 1500);
      return false;
    }
  }

  const getRating = useCallback(async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/ListarMediaAvaliacaoFicha/${id}`
      );
      return response.data.media_avaliacao;
    } catch (error) {
      console.error("Erro ao obter a avaliação da ficha:", error);
      setMessage({
        error: true,
        content: "Erro ao obter a avaliação!",
      });
      return null;
    }
  }, []);

  const getUserRating = async (userId, sheetId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/ListarAvaliacoesUsuario/${userId}`
      );
      return (
        response.data.find((rating) => rating.id_ficha === sheetId)
          ?.avaliacao || 0
      );
    } catch (error) {
      console.error("Erro ao obter a avaliação do usuário:", error);
      return null;
    }
  };

  const setCurrentRating = async (id_user, id_sheet, rating) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/AvaliarFicha`,
        { id_user, id_sheet, rating }
      );
      setMessage({ error: false, content: "Ficha avaliada com sucesso!" });
      return response.data;
    } catch (error) {
      console.error("Erro ao avaliar a ficha:", error);
      setMessage({
        error: true,
        content: "Erro ao avaliar a ficha!",
      });
    }
  };

  const listAllSheets = useCallback(async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/ListarTodasFichas?id=${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao listar fichas:", error);
      setMessage({
        error: true,
        content: "Erro ao listar fichas!",
      });
      return null;
    }
  }, []);
  

  const listMySheets = useCallback(async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/ListarFichasUsuario?id=${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao listar minhas fichas:", error);
      setMessage({
        error: true,
        content: "Erro ao listar minhas fichas!",
      });
      return null;
    }
  }, []);


  const listTopSheets = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/ListarTopFichas");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar as 5 melhores fichas:", error);
      return [];
    }
  };

  const triggerUpdate = () => {
    setUpdateFlag((prev) => !prev);
  }

  const value = {
    user,
    registerUser,
    loginUser,
    message,
    logoutUser,
    uploadFile,
    getRating,
    setCurrentRating,
    listAllSheets,
    getUserRating,
    triggerUpdate,
    listMySheets,
    listTopSheets,
    deleteSheet,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
