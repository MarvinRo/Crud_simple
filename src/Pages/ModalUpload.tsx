import React, { useState } from 'react';
import { Button, Modal ,Input } from 'antd';
import axios from 'axios';
import lapis from '../../public/writing.png'

const ModalUpload: React.FC = () => {
    const [update, setUpdate] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    function onUpdate(login: any){
    
        axios.put("http://localhost:3001/api/put",{
          senha:update,
          login:login,
        })
        setUpdate("")
        setIsModalOpen(false);
      }

    return (
        <>
            <Button style={{background: 'transparent',border:"none",boxShadow:'none'}} type="primary" onClick={showModal}>
            <img  src={lapis} />
            </Button>
            <Modal title="Troca de senha" open={isModalOpen} onOk={onUpdate} onCancel={handleCancel}>
                <label>Senha:</label>
                <Input placeholder='Digite seu nome'onChange={(e)=>{setUpdate(e.target.value)}}></Input>
            </Modal>
        </>
    );
};

export default ModalUpload;