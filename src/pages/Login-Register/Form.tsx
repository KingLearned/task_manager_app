import BodyFramer from '@/components/BodyFramer'
import { AuthContext } from '@/contexts/authContext'
import Proxy from '@/shared/Proxy'
import axios from 'axios'
import React, { useState, ChangeEvent, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const justfyCenter = 'flex flex-col justify-center items-center'
const inputStyle = 'p-2 my-2 outline-primary-500 border-2 placeholder-gray-500 w-full rounded-lg'

type Props = {
    Lable: string
    placeholderUsername?: string
    placeholderPwd: string
    navTo: string
    Btn: string
    Que: string
    needEmail: true
    title: string
}

const Form = ( { title,Lable, placeholderUsername, placeholderPwd, needEmail, Que, navTo, Btn }:Props ) => {

  const [err,setError] = useState('')
  const navigate = useNavigate()

  const { login } = useContext(AuthContext)

  const [inputs, setInputs] = useState({
    username:"",
    email:"",
    pwd:"",
    Cpwd:"",
  })
  
  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    return setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validateUsername = inputs.username.length < 3 ? 'Username must be more than two character!' : inputs.username.replace(/[^a-z^A-Z^0-9]/g, '') !== inputs.username ? 'Username must contain only alphabets & numbers!' : ''
    const validateEmail = !/^[a-z0-9._]+@[gmail|yahoo|outlook]+.com$/.test(inputs.email) ? 'Invalid email!' : ''
    const validPassword =  inputs.pwd.length < 7 ?  'Password must be more than 6 characters!' : inputs.pwd !== inputs.Cpwd ? 'Mismatched Password!' : ''

    const handleErr = inputs.username && inputs.email && inputs.pwd && inputs.Cpwd ? validateUsername || validateEmail || validPassword : 'Empty Inputs!'

    // PERFORM USER REGISTRATION
    if(!handleErr){
      try {
        const res = await axios.post(`${Proxy}/auth/register`, inputs)
        res.data.Error ?
        (
          setError(res.data.Error),
          setTimeout(() => { setError('') }, 3000)
        )
        :
        res.data.success &&
        navigate('/login')
        
      }
      catch (err){
        console.log(err)
      }
    }else{ placeholderUsername && setError(handleErr), setTimeout(() => { setError('') }, 3000)}

    // PERFORM USERS LOGIN
    if(!placeholderUsername && inputs.email && inputs.pwd){
      try {
        const res = await axios.post(`${Proxy}/auth/login`, inputs)
        res.data.Error ? 
        ( 
          setError(res.data.Error),
          setTimeout(() => { setError('') }, 3000)
        ) : (
          await login(inputs), //Capture and Store Users Data to the Storage
          navigate('/Dashboard')
        )
        
      } catch (err) {
        console.log(err)
      }
    }else{!placeholderUsername && setError(handleErr), setTimeout(() => { setError('') }, 3000)}
  }
  
  

  return (
    <BodyFramer>
      <div className={` ${justfyCenter}`}>
        <h1 className={`font-[900] text-[20px] my-3 text-white`}>{Lable}</h1>
        <form className={`${justfyCenter} bg-white p-5 w-full sm:w-[90%] md:w-[40%]  rounded-md`} action="">
          <h1 className='font-bold text-2xl'>{title}</h1>
          {placeholderUsername && <input type="text" name='username' className={inputStyle} placeholder={placeholderUsername} onChange={handleChange} />}
          <input type="email" name='email' className={inputStyle} placeholder='Email' onChange={handleChange} />
          <input type="password" name='pwd' className={inputStyle}  placeholder={placeholderPwd} onChange={handleChange} />
          {placeholderUsername && <input type="password" name='Cpwd' className={inputStyle}  placeholder='Confirm Password' onChange={handleChange} />
          }
          <p className='py-2 min-h-[25px] text-danger text-center'>{
          err && err 
          }</p>
          <button className='rounded-md w-full font-bold bg-primary-500 text-white px-10 py-2 hover:bg-primary-100' onClick={handleSubmit}>{Btn}</button>
          <span className={justfyCenter}>{Que} <Link className='text-primary-500 font-bold' to={`/${navTo.toLocaleLowerCase()}`}>{navTo}</Link></span>
        </form>
      </div>
    </BodyFramer>
  )
}

export default Form