import React, { useContext, useEffect } from 'react'
import Form from './Form'
import { AuthContext } from '@/contexts/authContext'
import { useNavigate } from 'react-router-dom'


const Register = () => {
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    currentUser && navigate('/Dashboard')
  })

  return (
    <Form 
    title='Get Started!'
    Lable='REGISTER' 
    placeholderUsername='Username' 
    placeholderPwd='Password' 
    needEmail Que='Already have an account?' 
    navTo='Login' 
    Btn='Register' />
  )
  
}

export default Register