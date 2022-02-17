import { useState, createContext, useEffect } from 'react'
import { showMessageError, showMessageSuccess } from '../components/alerts'
import { firebase, registerUser, addDb, logout, login, getUserbyUid } from '../services/firebaseConnection'

export const AuthContext = createContext({})

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const loadStorage = () => {
      const storageUser = localStorage.getItem('SistemaUser')
      if (storageUser) {
        setUser(JSON.parse(storageUser))
        setLoading(false)
      }
      setLoading(false)
    }

    loadStorage()

  }, [])

  const signIn = async (email, password) => {
    setLoadingAuth(true)
    try{
      const uidUser = await login(email, password)
      const user = await getUserbyUid(uidUser.user.uid)
      const data = Object.assign({}, user, {uid: uidUser.user.uid, email})
      localStorage.setItem('SistemaUser', JSON.stringify(data))
      setUser(data)
      setLoadingAuth(false)
      showMessageSuccess('Login', `Seja bem Vindo ${data.nome}`)
    }catch(error){
      console.log(error);
      showMessageError('Login', 'Credenciais inválidas')
      setLoadingAuth(false)
    }

  }

  const signUp = async (nome, email, password) => {
    setLoadingAuth(true)
    try {
      const newUser = await registerUser(email, password)
      const uid = newUser.uid
      console.log(newUser);
      try {
        const doc = await addDb(uid, { nome, avatarUrl: null }, 'users')
        let data = {  uid, nome, email, avatarUrl: null }
        setUser(data)
        storageUser(data)
        showMessageSuccess('Bem Vindo',`Prazer em conhece-lo(a) ${nome}`)
        setLoadingAuth(false)
      } catch (error) {
        showMessageError('Ops.', 'Houve algum problema')
        console.log(error);
      }
    }
    catch (error) {
      console.log(error);
      showMessageError('Ops.', 'email ou senha inválida')
      setLoadingAuth(false)
    }
  }

  const signOut = async () => {
    await logout()
    localStorage.removeItem('SistemaUser')
    setUser(null)
  }

  const storageUser = (data) => {
    localStorage.setItem('SistemaUser', JSON.stringify(data))
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, signUp, signOut, signIn, loadingAuth, setUser, storageUser }}>
      {children}
    </AuthContext.Provider>
  )
}