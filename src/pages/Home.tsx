import { Link } from 'react-router-dom'
import drawImg from '@/assets/undraw_add_tasks.svg'
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import useMediaQuery from '@/hooks/useMediaQuery';
import BodyFramer from '@/components/BodyFramer';


const Home = () => {

  const isAboveMediumScreens = useMediaQuery("(min-width: 560px)")

  return (
    <BodyFramer>
      <div className={`flex mt-10`}>
          <div className='justify-center'>
            <h1 className='text-white font-bold text-3xl'>Task Management Application</h1>
            <h3 className='text-white font-bold text-2xl mb-[30px]'>Efficient in tracking and managing your daily tasks.</h3>

            <h1 className='text-white flex my-10'><CheckCircleIcon className='w-[20px] mr-2'/>Create, assign and track tasks.</h1>
            <h1 className='text-white flex my-10'><CheckCircleIcon className='w-[20px] mr-2'/>Set due dates and reminders.</h1>
            <h1 className='text-white flex my-10'><CheckCircleIcon className='w-[20px] mr-2'/>Categorize and prioritize tasks.</h1>
            <div className='flex my-10 items-center bg-white/50 p-1 w-[max-content]  rounded-full'>
              <h1 className='text-white font-bold mr-10'>Get Started Now!</h1> 
              <Link to='/register'><button className='px-5 py-2 font-bold bg-primary-500 rounded-full text-white hover:bg-primary-300'>Register</button></Link>
            </div>

          </div>
          {isAboveMediumScreens && <img className='w-[60%]' src={drawImg} alt="" />}
        </div>
    </BodyFramer>
  )
}

export default Home