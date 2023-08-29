import { Logo } from '@/components/useimg'
import { ArrowRightOnRectangleIcon, Bars3Icon, BriefcaseIcon, CalendarDaysIcon, CheckCircleIcon, ClockIcon, Cog8ToothIcon, MagnifyingGlassIcon, NewspaperIcon, PencilSquareIcon, PresentationChartBarIcon, StarIcon, TrashIcon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/solid'
import TaskContent from '@/components/TaskContent'
import AddTask from '@/components/AddTask'
import { useContext, useEffect, useState } from 'react'
import useMediaQuery from '@/hooks/useMediaQuery'
import { AuthContext } from '@/contexts/authContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Proxy from '@/shared/Proxy'
import { taskContentType } from '@/shared/defineTypes'



const DashBoard = () => {
    const [createTask,setCreatTask] = useState<Boolean>(false)
    
    const isScreens1000px = useMediaQuery("(min-width: 1200px)");
    const isScreens560px = useMediaQuery("(min-width: 560px)");
    const [mediaScreen,setMediaScreen] = useState<Boolean>(false)

    const [allTask,setTask] = useState<taskContentType[]>()

    const navigate = useNavigate()
    const { currentUser, logout } = useContext(AuthContext)
    const handleLogout = () => { logout(); navigate('/') }

    const activeLine = 'bg-white text-primary-500 p-2 rounded-md'
    const [activeNav,setActiveNav] = useState<string|null>('All Task')

    const [activeTask,setActiveTask] = useState<number>() 
    const [selectTask,setSelectTask] = useState(Object)
    
    const [viewContent,setViewContent] = useState<Boolean>(false)
    const [query,setQuery] = useState<Boolean>(false)
    const [findTask,setfindTask] = useState<string>()
    const [findCheck,setfindCheck] = useState<Boolean>(false)

    // GET ALL TASKS RELATING TO THE USER
    useEffect(() => {
        !currentUser && navigate('/')
        const getTask = async () => {
            if(currentUser){
                try{
                    const res = await axios.get(`${Proxy}/tasks/`,{ params:{ id:currentUser?.id } })
                    return setTask(res.data)
                }catch(err){ console.log(err) }
            }
        };getTask()
    },[])

    // FETCH THE NEW TASK AFTER IT HAS BEEN ADDED
    const fetchNewtask = async () => {
        try{
            const res = await axios.get(`${Proxy}/tasks/`,{ params:{ id:currentUser?.id } })
            return setTask(res.data)
        }catch(err){ console.log(err) }
    }
    // FUNCTION FOR QUERING THE API
    const filterTask = async () => {
        
        try{
            const res = await axios.get(`${Proxy}/tasks/`,{ params:{ id:currentUser?.id, search:findTask } })
            setfindCheck(true)
            return setTask(res.data)
        }catch(err){ console.log(err) }
    }

    const rendTask = (eachTask:taskContentType) => {
        const trueDate = new Date(Number(eachTask.date)).toLocaleString('en-US', {weekday:'short',month:'short',year:'numeric',hour:'numeric',minute:'numeric',hour12:true})
        const deleteTask = () => { 
            try {
                axios.delete(`${Proxy}/tasks/${eachTask.id}`) 
            } catch (error) { console.log(error) } 
            setTask(allTask?.filter((_,i) => i !== allTask.indexOf(eachTask)));setSelectTask('')
        }

        return (
            <div className={`flex rounded-md shadow-md items-center p-5 w-full cursor-pointer bg-white my-2 ${eachTask.id === activeTask && 'border-[2px] border-primary-300'}`} key={eachTask.id}>
                <CheckCircleIcon className='h-[22px] mx-3'/>
                <div className='w-[90%]' onClick={() => {setActiveTask(eachTask.id), setSelectTask(eachTask) , setViewContent(true)}}>
                    <div className='flex items-center'>
                        <h1 className='font-bold text-gray-500 mr-3'>{eachTask.title}</h1>
                        <h1 className='text-gray-300 text-[13px]'>{eachTask.cat}</h1>
                    </div>
                    <div className='md:flex'>
                        <h1 className='text-gray-500 text-1xl mr-5'>Total sub tasks <span className='text-gray-300'>({`${eachTask.subtask.length}`})</span></h1>
                        <h1 className='flex text-gray-500 text-1xl mr-5'><ClockIcon className='h-[22px] mr-3'/><span className='text-gray-300'>{trueDate}</span></h1>
                        <h1 className='flex text-gray-500 text-1xl mr-5'><NewspaperIcon className='h-[22px] mr-3'/><span className='text-gray-300 capitalize'>{eachTask.note.slice(0,25)}</span></h1>
                    </div>
                </div>
                <div className='flex items-center justify-end'>
                    <StarIcon className='h-[22px] mr-5'/>
                    <TrashIcon className='h-[22px]' onClick={() => {deleteTask()}} />
                </div>
            </div>
        )  
    }

    return (
        <div className={`${isScreens1000px && 'flex'} relative`}>
            {createTask && <AddTask closeAddtask={() => {setCreatTask(false), fetchNewtask()}}/>}

            {/* FIRST/LEFT COLUMN SECTION AND MEDIA QUERIES  */}
            {isScreens1000px ?
                <div className={`bg-primary-500 w-[30%] px-3`}>
                    <div className='border-b-[1px] flex justify-center'>
                        <img className='w-[150px] h-[50px]' src={Logo} alt={Logo} />
                    </div>
                    <div className='flex items-center pl-5 my-5'>
                        <UserCircleIcon className='w-[50px] h-[50px]'/>
                        <h1 className='text-white font-bold ml-5 capitalize'>{currentUser?.username}</h1>
                    </div>
                    <div className='pl-5 text-white font-bold border-b-[1px]'>
                        <h1 className={`my-[50px] flex cursor-pointer  ${'All Task' === activeNav ? activeLine : ''}`} onClick={() => {setActiveNav('All Task')}}><CalendarDaysIcon className=' mr-5 h-[22px]'/>All Task</h1>
                        <h1 className={`my-[50px] flex cursor-pointer ${'Personal' === activeNav && activeLine}`} onClick={() => {setActiveNav('Personal' === activeNav ? 'All Task' : 'Personal')}}><UserCircleIcon className=' mr-5 h-[22px]'/>Personal</h1>
                        <h1 className={`my-[50px] flex cursor-pointer ${'Work' === activeNav && activeLine}`} onClick={() => {setActiveNav('Work' === activeNav ? 'All Task' : 'Work')}}><BriefcaseIcon className=' mr-5 h-[22px]'/>Work</h1>
                        <h1 className={`my-[50px] flex cursor-pointer ${'Important' === activeNav && activeLine}`} onClick={() => {setActiveNav('Important' === activeNav ? 'All Task' : 'Important')}}><StarIcon className=' mr-5 h-[22px]'/>Important</h1>
                    </div>
                    <div className='pl-5 text-white font-bold'>
                        <h1 className='my-10 flex cursor-pointer' onClick={handleLogout}><ArrowRightOnRectangleIcon className=' mr-5 h-[22px]'/>Logout</h1>
                    </div>
                </div>
                :
                <div className='sticky top-0 z-10'>
                    <div className='flex items-center justify-between sticky top-0 bg-primary-500 w-full p-2 mb-3'>
                        <img className='w-[150px] h-[50px]' src={Logo} alt={Logo} />
                        {mediaScreen ? 
                        <XMarkIcon className='h-[35px] text-white cursor-pointer' onClick={() => {setMediaScreen(false)}}/>
                        :
                        <Bars3Icon className='h-[35px] text-white cursor-pointer' onClick={() => {setMediaScreen(true)}}/>
                        }
                    </div>
                    {mediaScreen && 
                    <div className={`bg-primary-500 absolute top-[65px] w-[${!isScreens560px ? '80%' : '50%'}] h-[100vh]`}>
                        <div className='flex items-center pl-5 my-5'>
                            <UserCircleIcon className='w-[50px] h-[50px]'/>
                            <h1 className='text-white font-bold ml-5 capitalize'>{currentUser?.username}</h1>
                        </div>
                        <div className='pl-5 text-white font-bold border-b-[1px]'>
                            <h1 className={`my-11 flex cursor-pointer  ${'All Task' === activeNav ? activeLine : ''}`} onClick={() => {setActiveNav('All Task')}}><CalendarDaysIcon className=' mr-5 h-[22px]'/>All Task</h1>
                            <h1 className={`my-11 flex cursor-pointer ${'Personal' === activeNav && activeLine}`} onClick={() => {setActiveNav('Personal' === activeNav ? 'All Task' : 'Personal')}}><UserCircleIcon className=' mr-5 h-[22px]'/>Personal</h1>
                            <h1 className={`my-11 flex cursor-pointer ${'Work' === activeNav && activeLine}`} onClick={() => {setActiveNav('Work' === activeNav ? 'All Task' : 'Work')}}><BriefcaseIcon className=' mr-5 h-[22px]'/>Work</h1>
                            <h1 className={`my-11 flex cursor-pointer ${'Important' === activeNav && activeLine}`} onClick={() => {setActiveNav('Important' === activeNav ? 'All Task' : 'Important')}}><StarIcon className=' mr-5 h-[22px]'/>Important</h1>
                        </div>
                        <div className='pl-5 text-white font-bold'>
                            <h1 className='my-10 flex cursor-pointer' onClick={handleLogout}><ArrowRightOnRectangleIcon className=' mr-5 h-[22px]'/>Logout</h1>
                        </div>
                    </div>
                    }
                </div>
            }
            {/* MIDDLE/CENTER SECTION FOR TASK DISPLAY */}
            <div className={`w-full bg-gray-50 md:p-5 p-1 ${isScreens1000px ? 'overflow-auto h-[99vh]' : 'min-h-[99vh]'}`}>
                <div className='bg-primary-500 text-white rounded-md flex p-2'>
                    <MagnifyingGlassIcon className='h-[22px] mr-2'/>
                    <form className='flex w-full' onSubmit={(e) => {e.preventDefault(),filterTask()}}><input className='outline-none bg-transparent w-full' value={!query ? '' : findTask} onChange={(e) => {e.target.value.length > 0 ? (setQuery(true),setfindCheck(false),setfindTask(e.target.value)) : (fetchNewtask(),setQuery(false))}} type="text" placeholder='Search' /></form>
                    {query && <XMarkIcon className='h-[22px] mr-2' onClick={() => {fetchNewtask(),setQuery(false)}} />}
                </div>
                <div className='mt-5'>
                    <div className='flex items-center'>
                        <h1 className='font-bold mr-5'>TASKS <span className='text-primary-500 font-[100]'>{`> ${activeNav}`}</span></h1>
                        <button className='text-white font-bold bg-primary-500 px-3 py-1 rounded-md' onClick={() => {setCreatTask(true)}}>+ Add Task</button>
                    </div>
                    {/* RENDERING OF CATEGORIZED TASK OF USER */}
                    <div className='w-full mt-5'>
                        {
                            allTask ?
                            allTask?.length as never > 0 ? activeNav == 'All Task' || activeNav  == null ? allTask.map(eachTask => ( rendTask(eachTask) )) : 
                            allTask.some(eachTask => eachTask.cat === activeNav) ? allTask.map(eachTask => ( eachTask.cat === activeNav && rendTask(eachTask) )) :
                            <h1 className='rounded-md shadow-md text-center p-5 w-full cursor-pointer bg-white text-2xl font-bold'>No task on this category!</h1>
                            :
                            <h1 className='rounded-md shadow-md text-center p-5 w-full cursor-pointer bg-white text-2xl font-bold'>{findTask ? <span>{!findCheck ? 'Searching for key word' : 'No search result for the key word'} "<i className='text-primary-500'>{findTask}</i>"</span> : 'You have not created any task yet!'}</h1>
                            :
                            <h1 className='rounded-md shadow-md text-center p-5 w-full cursor-pointer bg-white text-2xl'>Loading...</h1>
                        }
                    </div>
                </div>
            </div>

            {/* RIGHT/LAST COLUMN SECTION FOR RENDERING TASK CONTENTS */}
            {isScreens1000px ?
            <div className='w-[30%] m-5 overflow-y-auto'>
                <TaskContent showContent={selectTask}/>
            </div>
            :
            viewContent && 
            <div className='bg-white h-full w-[99%] absolute top-[70px] mx-1 px-5'>
                <XMarkIcon className='h-[35px] cursor-pointer mb-2' onClick={() => {setViewContent(false)}}/>
                <TaskContent showContent={selectTask}/>
            </div>
            }
        </div>
    )
}

export default DashBoard