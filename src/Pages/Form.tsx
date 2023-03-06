import { useState,useEffect} from 'react'
import axios from 'axios'
import '../Style/Form.css'

function Form() {
  const [login,setLogin]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [validation_password,setValidation_Password]= useState('');
  const [userList,setUserList]= useState ([]);


  useEffect(() => {
    axios.get('http://localhost:3001/api/get').then((response) => {
      setUserList(response.data)
  })
  },[])

  function onSubmit(){
    axios.post("http://localhost:3001/api/cadastro",{
      login:login,
      email:email,
      password:password,
    }).then(()=>{
      alert("Success")
    });
  };

  

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
      {/* <label>
        Confirme sua senha:
        <input type="password" placeholder='Repita suasenha aqui'onChange={(e)=>{setValidation_Password(e.target.value)}}/>
      </label> */}

      <button onClick={onSubmit}>Cadastrar</button>

    </div>
      {userList.map((val)=>{
        return <h1>Login:{val.login} | Email:{val.email} | Senha:{val.password}</h1>
        })}
    </>
  )
}

export default Form
