import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import '../Style/Form.css';
import { Badge, Button, Popover, Switch, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import ModalCadastro from './Modal';
import lixeira from '../img/trash.png';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import ModalUpload from './ModalUpload';

interface DataType {
  key?: React.Key;
  login: string;
  email: string;
  senha: string;
}

const Form: React.FC = () => {

  const [data, setData] = useState<DataType[]>([]);
  const [selectedLogin, setSelectedLogin] = useState<string>(""); // Estado para armazenar o login selecionado

  const columns: ColumnsType<DataType> = [
    {
      align:'center',
      title: 'Id',
      dataIndex: 'key',
      width: 80,
    },
    {
      align:'center',
      title: 'Nome',
      dataIndex: 'login',
      width: 150,
    },
    {
      align:'center',
      title: 'Email',
      dataIndex: 'email',
      width: 200,
    },
    {
      align:'center',
      title: 'Senha',
      render: (fetchData) => (
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          <Popover content={fetchData.senha} title="Senha" trigger="click">
            <Button style={{border:"none", background: 'transparent', boxShadow:"none"}}><EyeOutlined/></Button>
          </Popover>
        </div>
      ),
      dataIndex: '',
      width: 150,
    },
    {
      align:'center',
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (record) => (
        <div style={{ display: 'flex' }}>
          <ModalUpload login={selectedLogin} fetchData={fetchData} /> {/* Passando o login selecionado e a função fetchData como propriedades */}
          <button
            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
            type="submit"
            className="button_map"
            onClick={() => onDelete(record.login)}
          >
            <img src={lixeira} alt="Lixeira" />
          </button>
        </div>
      ),
      width: 100,
    },
  ];

  
  useEffect(() => {
    fetchData()
  }, []);
  
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/get');
      const newData = response.data.map((item: any) => ({
        key: item.id,
        login: item.login,
        email: item.email,
        senha: item.senha,
      }));
      setData(newData);
    } catch (error) {
      console.error(error);
    }
  };

  const onDelete = async (login: string) => {
    try {
      await axios.delete(`http://localhost:3001/api/delete/${login}`);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ marginTop: '25vh', marginRight: 'auto', marginLeft: 'auto', width: '900px' }}>
      <ModalCadastro fetchData={fetchData} />
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 50 }}
        scroll={{ y: 240 }}
        onRow={(record) => ({
          onClick: () => setSelectedLogin(record.login), // Atualiza o login selecionado
        })}
        rowClassName={(record) => (record.login === selectedLogin ? 'selected-row' : '')} // Estiliza a linha selecionada
      />
    </div>
  );
};

export default Form;
