import React, { useState } from 'react';
import { Button, Modal ,Input } from 'antd';
import axios from 'axios';
import lapis from '../img/writing.png'


const ModalUpload: React.FC = () => {
  const [update, setUpdate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [login, setLogin] = useState(""); // Adicionado estado para armazenar o valor do login

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function onUpdate() {
    axios
      .put("http://localhost:3001/api/put", {
        senha: update,
        login: login,
      })
      .then(response => {
        setUpdate("");
        setIsModalOpen(false);
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <>
      <Button
        style={{ background: 'transparent', border: "none", boxShadow: 'none' }}
        type="primary"
        onClick={showModal}
      >
        <img src={lapis} alt="Lápis" />
      </Button>
      <Modal
        title="Troca de senha" open={isModalOpen} onOk={onUpdate} okText='Mudar' onCancel={handleCancel} cancelText='Cancelar'
      >
        <label>Login:</label>
        <Input placeholder="Digite seu login" onChange={e => setLogin(e.target.value)} />
        <label>Senha:</label>
        <Input placeholder="Digite sua senha" onChange={e => setUpdate(e.target.value)} />
      </Modal>
    </>
  );
};

export default ModalUpload;