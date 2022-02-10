import './signin.css'
import logo from '../../assets/logo.png'
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth'
//import { writeFileSync } from 'fs'



function SignIn() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { signIn, loadingAuth } = useContext(AuthContext)

  const onSubmit = async (e) => {
    e.preventDefault()
    await signIn(email, password)
  }

  return (
    <>
      <div className='signin--body'>
        <form className='signin--signin' onSubmit={onSubmit}>
          <header className='signin--header'>
            <img src={logo}></img>
          </header>
          <div className='signin--login'>
            <h1>Entrar</h1>
            <input placeholder='E-mail' className='signin--input' value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
            <input placeholder='Senha' className='signin--input' value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
            <button className='signin--onSubmit' type='submit' disabled={loadingAuth ? true : false}>{loadingAuth ? 'Carregando...' : 'Acessar'}</button>
            <a onClick={() => { navigate('/register') }}>Criar uma conta</a>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignIn;
