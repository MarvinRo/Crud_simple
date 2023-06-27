import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import axios from 'axios';
import lapis from '../img/writing.png';

interface ModalUploadProps {
  login: string;
  fetchData: () => void;
}

const ModalUpload: React.FC<ModalUploadProps> = ({ login, fetchData }) => {
  const [update, setUpdate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    resetForm();
    setIsModalOpen(false);
  };

  const onUpdate = () => {
    axios
      .put("http://localhost:3001/api/put", {
        senha: update,
        login: login,
      })
      .then(response => {
        setIsModalOpen(false);
        resetForm();
        fetchData();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const resetForm = () => {
    setUpdate("");
  };
  
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
        title="Troca de senha"
        open={isModalOpen}
        onOk={onUpdate}
        okText='Mudar'
        onCancel={handleCancel}
        cancelText='Cancelar'
      >
        <label>Senha:</label>
        <Input placeholder="Digite sua senha" value={update} onChange={e => setUpdate(e.target.value)} />
      </Modal>
    </>
  );
};

export default ModalUpload;
