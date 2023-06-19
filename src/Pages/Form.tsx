import { useState,useEffect} from 'react'
import React from 'react';
import axios from 'axios'
import '../Style/Form.css'

function Form() {
  const [login,setLogin]=useState("");
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [update,setUpdate]=useState("");
  const [validation_password,setValidation_Password]= useState('');
  const [userList,setUserList]= useState ([]);


  useEffect(() => {
    axios.get('http://localhost:3001/api/get').then((response) => {
      setUserList(response.data)
  })
  },[]) 

  function onDelete(login: any){
    axios.delete(`http://localhost:3001/api/delete/${login}`)
  }

  function onUpdate(login: any){
    axios.put("http://localhost:3001/api/put",{
      senha:update,
      login:login,
    })
    setUpdate("")
  }

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
    setUserList([
      ...userList,
      {login:login,email:email,senha:password}, 
    ]);
    }
  }
  return (
    <>
    <div className='Form'>
      <label>
        Nome:
        <input type="text" placeholder='Cadastre seu nome aqui'onChange={(e)=>{setLogin(e.target.value)}}/>
      </label>
      <label>
        Email:
        <input type="email" placeholder='Cadastre seu email aqui'onChange={(e)=>{setEmail(e.target.value)}}/>
      </label>
      <label>
        Senha:
        <input type="password" placeholder='Cadastre sua senha aqui'onChange={(e)=>{setPassword(e.target.value)}}/>
      </label>
      <label>
        Confirme sua senha:
        <input type="password" placeholder='Repita suasenha aqui'onChange={(e)=>{setValidation_Password(e.target.value)}}/>
      </label>

      <button onClick={onSubmit}>Cadastrar</button>

    </div>
    
      {userList.map((val)=>{
        return (<div className='UserList'>
          <h4>Login:</h4> {val.login} | 
          <h4>Email:</h4> {val.email} | 
          <h4 >Senha:</h4> {val.senha } 
          <input style={{marginLeft:"5px"}} type="text" onChange={(e)=>{setUpdate(e.target.value)}}/>
          <button type="submit" className="button_map" onClick={()=> {onUpdate(val.login)}}>Update</button>
          <button type="submit" className="button_map" onClick={()=> {onDelete(val.login)}}>Deletar</button>
          
          </div>)
        })} 
    </>
  )
}

export default Form
