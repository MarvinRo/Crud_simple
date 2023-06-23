import React, { useState } from 'react';
import { Button, Modal ,Input } from 'antd';
import axios from 'axios';

const ModalCadastro: React.FC = () => {
    const [login, setLogin] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validation_password, setValidation_Password] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    function onSubmit(){
        if(validation_password !== password){
          alert("Senhas diferentes pf corrija")
        }  
        else if(login == "" || login.length < 2){ 
          alert("Campo nome vazio ou a baixo de 2 caracter, por favor registre um nome valido")
        }
        else if(email == ""){
          alert("Campo email vazio, por favor registre um email valido")
        }
        else if(password == "" || password.length < 5){
          alert("Campo invalido, por favor registre uma senha valida com no minimo 6 caracteres")
        }
        else{
          axios.post("http://localhost:3001/api/post",{
          login:login,
          email:email,
          senha:password,
        }).then(()=>{
          alert("Success!");
        });
        setIsModalOpen(false);
        }
      }

    return (
        <>
            <Button type="primary" onClick={showModal}>
                + Cadastrar Usuário
            </Button>
            <Modal title="Cadastro de Usuário" open={isModalOpen} onOk={onSubmit} onCancel={handleCancel}>
                <label>Nome:</label>
                <Input placeholder='Digite seu nome' onChange={(e)=>{setLogin(e.target.value)}}></Input>
                <label>Email:</label>
                <Input placeholder='Digite seu nome'onChange={(e)=>{setEmail(e.target.value)}}></Input>
                <label>Senha:</label>
                <Input placeholder='Digite seu nome'onChange={(e)=>{setPassword(e.target.value)}}></Input>
                <label>Confirme sua Senha:</label>
                <Input placeholder='Digite seu nome'onChange={(e)=>{setValidation_Password(e.target.value)}}></Input>
            </Modal>
        </>
    );
};

export default ModalCadastro;