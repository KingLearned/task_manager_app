import { useContext, useEffect } from 'react'
import Form from './Form'
import { AuthContext } from '@/contexts/authContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    currentUser && navigate('/Dashboard')
  })

  return (
    <Form 
    title='Welcome Back!'
    Lable='LOGIN' 
    needEmail
    placeholderPwd='Password' 
    Que="Don't Have an account?" 
    navTo='Register' 
    Btn='Login' />
  )
  

}

export default Login