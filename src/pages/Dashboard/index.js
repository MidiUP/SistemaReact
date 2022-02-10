import { AuthContext } from '../../contexts/auth'
import { useContext } from 'react'
import Header from '../../components/Header'
import Title from '../../components/Title'

export default function Dashboard() {

  const { signOut } = useContext(AuthContext)

  const logout = () => {
    signOut()
  }


  return (
    <>
      <Header></Header>
      <h1>Página de Dashboards</h1>
      <button onClick={logout}>logout</button>
    </>
  )
}