import React from 'react'
import { Logo } from './useimg'
import { Link, useLocation } from 'react-router-dom'
import useMediaQuery from '@/hooks/useMediaQuery'

const TopMenu = () => {
    const Location = useLocation()
    const isAboveMediumScreens = useMediaQuery("(min-width: 560px)");

    return (
        <div className='py-4 flex items-center justify-between sticky top-0'>
            <div>
                <Link to='/'><img className='w-[150px] h-[50px]' src={Logo} alt={Logo} /></Link>
            </div>
            <div>
                {
                !isAboveMediumScreens ?
                    Location.pathname == '/' &&
                    <Link to='/login'><button className='px-5 py-2 font-bold bg-white rounded-full shadow-lg text-primary-500 hover:border-primary-500 border-[1px] mx-4'>Login</button></Link>
                    :
                    Location.pathname == '/' &&
                    <>
                        <Link to='/login'><button className='px-5 py-2 font-bold bg-white rounded-full shadow-lg text-primary-500 hover:border-primary-500 border-[1px] mx-4'>Login</button></Link>
                        <Link to='/register'><button className='px-5 py-2 font-bold bg-primary-500 rounded-full shadow-lg text-white hover:bg-primary-100 mx-4'>Register</button></Link>
                    </>
                }
            </div>
        </div>
    )
}

export default TopMenu