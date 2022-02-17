import './header.css'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import avatar from '../../assets/avatar.png'
import { FiHome, FiUser, FiSettings } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

export default function Header() {

  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  return (
    <>
      <div className='header--sidebar'>
        <div>
          {user ?
            <img src={user.avatarUrl ? user.avatarUrl : avatar}></img>
            :
            <img src={avatar}></img>
          }
        </div>
        <a onClick={() => { navigate('/dashboard') }}> <FiHome color='#FFF' size={24} />Chamados</a>
        <a onClick={() => { navigate('/customers') }}> <FiUser color='#FFF' size={24} />Clientes</a>
        <a onClick={() => { navigate('/profile') }}> <FiSettings color='#FFF' size={24} />Configurações</a>
      </div>
    </>
  )
}