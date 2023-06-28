import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';

const ModalCadastro: React.FC = () => {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationPassword, setValidationPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    ClearCamp();
  };

  const onSubmit = () => {
    if (validationPassword !== password) {
      alert('Senhas diferentes, por favor corrija.');
    } else if (login === '' || login.length < 2) {
      alert('Campo nome vazio ou abaixo de 2 caracteres, por favor registre um nome válido.');
    } else if (email === '') {
      alert('Campo email vazio, por favor registre um email válido.');
    } else if (password === '' || password.length < 6) {
      alert('Campo senha inválido, por favor registre uma senha válida com pelo menos 6 caracteres.');
    } else {
      axios
        .post('http://localhost:3001/api/post', {
          login: login,
          email: email,
          senha: password,
        })
        .then(() => {
          alert('Sucesso!');
        });
      setIsModalOpen(false);
      ClearCamp();
    }
  };

  const ClearCamp = () => {
    setLogin('');
    setEmail('');
    setPassword('');
    setValidationPassword('');
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        + Cadastrar Usuário
      </Button>
      <Modal
        title="Cadastro de Usuário"
        visible={isModalOpen}
        okText="Cadastrar"
        cancelText="Cancelar"
        onOk={onSubmit}
        onCancel={handleCancel}
      >
        <label>Nome:</label>
        <Input
          placeholder="Digite seu Nome"
          prefix={<UserOutlined className="site-form-item-icon" rev={undefined} />}
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <label>Email:</label>
        <Input
          placeholder="Digite seu Email"
          prefix="@"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Senha:</label>
        <Input
          placeholder="Digite sua Senha"
          prefix="🔒"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Confirme sua Senha:</label>
        <Input
          placeholder="Confirme a sua Senha"
          prefix="🔐"
          type="password"
          value={validationPassword}
          onChange={(e) => setValidationPassword(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default ModalCadastro;
