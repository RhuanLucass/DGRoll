import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AppContext = createContext({});

export const modalTypes = {
  REMOVE: "remove",
  NEWFILE: "newfile",
  VIEWFILE: 'viewfile',
};

export const AppProvider = ({ children }) => {
  const { deleteSheet } = useContext(AuthContext);
  const [isOpenModal, setIsOpenModal] = useState({
    type: null,
  });
  const [currentId, setCurrentId] = useState(0);

  const handleCloseModal = () => {
    setIsOpenModal({ type: null });
  };

  const handleOpenModalRemove = (id) => {
    setIsOpenModal({ type: modalTypes.REMOVE });
    setCurrentId(id);
  };

  const handleOpenModalViewFile = (sheet) => {
    setIsOpenModal({
      type: modalTypes.VIEWFILE,
      url_file: `http://localhost:3000/${sheet?.pdf_ficha}`
    });
    setCurrentId(sheet?.id_ficha);
    console.log(sheet?.pdf_ficha)
  }

  const handleOpenModalNewFile = () => {
    setIsOpenModal({ type: modalTypes.NEWFILE });
  };

  // const handleOpenModalEdit = () => {
  //   setIsOpenModal({ type: modalTypes.NEWFILE });
  // };

  const handleRemoveFile = async () => {
    const success = await deleteSheet(currentId);

    if(success){
      setTimeout(() => {
        handleCloseModal();
      }, 1500);
    }
  };

  const value = {
    isOpenModal,
    handleCloseModal,
    handleOpenModalRemove,
    handleRemoveFile,
    handleOpenModalNewFile,
    // handleOpenModalEdit,
    handleOpenModalViewFile
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
