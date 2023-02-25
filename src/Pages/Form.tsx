import React from 'react'
import '../Style/Form.css'

function Form() {
  function onSubmit(){
    console.log('Form submitted')
  }

  return (
    <>
    <div className='Form'>
      <label>
        Nome:
        <input type="text" placeholder='Cadastre seu nome aqui'/>
      </label>
      <label>
        Email:
        <input type="email" placeholder='Cadastre seu email aqui'/>
      </label>
      <label>
        Senha:
        <input type="password" placeholder='Cadastre sua senha aqui'/>
      </label>
      <label>
        Confirme sua senha:
        <input type="password" placeholder='Repita suasenha aqui'/>
      </label>

      <button onClick={onSubmit}>Cadastrar</button>

    </div>
    </>
  )
}

export default Form
