import { useEffect, useContext } from "react";
import { Route, useNavigate } from "react-router-dom";
import { AuthContext } from '../contexts/auth'

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const navigate = useNavigate()
  const { signed, user, loading} = useContext(AuthContext)


  useEffect(() => {
    if (!signed && isPrivate) {
      navigate('/')
    }
  
    if (signed && !isPrivate) {
      navigate('/dashboard')
    }
  }, [signed, user])

  if (loading) {
    return (
      <div></div>
    )
  }


  return (
    <Component />
  )
}