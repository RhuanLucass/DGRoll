import {
  ContainerButtons,
  ContainerFile,
  ContainerForm,
  ContainerInput,
  ContainerInputFile,
  ContainerInputs,
  ContainerInputTitle,
  ContainerLabel,
  ContainerTitle,
} from "./styles";
import { useContext, useEffect, useState } from "react";
import { AppContext, modalTypes } from "../../contexts/AppContext";
import { ModalGeneric } from "../ModalGeneric";
import { AuthContext } from "../../contexts/AuthContext";
import { Message } from "../Message";

export const ModalNewFile = () => {
  const { handleCloseModal, isOpenModal } = useContext(AppContext);
  const { uploadFile, user, message, triggerUpdate } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [titleFile, setTitleFile] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleTitle = (event) => {
    const title = event.target.value;

    if(title){
      setTitleFile(title); 
    }
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    const success = await uploadFile(file, titleFile, user?.id);

    if(success){
      setTimeout(() => {
        triggerUpdate();
        handleCloseModal();
      }, 1500)
    }
  }


  useEffect(() => {
    if(isOpenModal.type !== null){
      setFile('');
      setTitleFile(''); 
    }
  },[isOpenModal])

  const isNewFile = isOpenModal.type === modalTypes.NEWFILE;

  return (
    <ModalGeneric isOpen={isNewFile}>
      <Message error={message?.error} content={message?.content} />
      <ContainerTitle>
        <h3>Adicionar nova ficha</h3>
        <p>Preencha os campos e adicione sua ficha.</p>
      </ContainerTitle>

      <ContainerForm onSubmit={handleSubmit}>
        <ContainerInputs>
        <ContainerInputTitle>
          <label htmlFor="title">Título da ficha</label>
          <ContainerInput type="text" id="title" onChange={handleTitle} value={titleFile} required/>
        </ContainerInputTitle>

          <ContainerFile>
            <ContainerLabel htmlFor="file_input">Selecionar arquivo</ContainerLabel>
            <ContainerInputFile type="file" id="file_input" onChange={handleFileChange}  accept="application/pdf" />

            {file && <p>{file.name}</p>}

          </ContainerFile>
        </ContainerInputs>
        <ContainerButtons>
          <button>Enviar</button>
        </ContainerButtons>
      </ContainerForm>
    </ModalGeneric>
  );
};
