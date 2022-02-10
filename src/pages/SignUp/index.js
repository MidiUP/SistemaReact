import './signup.css'
import logo from '../../assets/logo.png'
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth'


function SignUp() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const {signUp, loadingAuth} = useContext(AuthContext)

  const onSubmit = (e) => {
    e.preventDefault()
    signUp(name, email, password)
    console.log(email, password)
  }

  return (
    <>
      <div className='signin--body'>
        <form className='signin--signin' onSubmit={onSubmit}>
          <header className='signin--header'>
            <img src={logo}></img>
          </header>
          <div className='signin--login'>
            <h1>Cadastrar-se</h1>
            <input placeholder='Seu nome' className='signin--input' value={name} onChange={(e) => { setName(e.target.value) }}></input>
            <input placeholder='E-mail' className='signin--input' value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
            <input placeholder='Senha' className='signin--input' type='password' value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
            <button className='signin--onSubmit' type='submit' disabled={loadingAuth ? true : false}>{loadingAuth ? 'Carregando...' : 'Cadastrar'}</button>
            <a onClick={() => { navigate('/') }}>Já tem uma conta? Entrar</a>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUp;
