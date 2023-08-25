import { AuthContext } from '@/contexts/authContext';
import useMediaQuery from '@/hooks/useMediaQuery';
import Proxy from '@/shared/Proxy';
import { seperateSubtask } from '@/shared/seperateSubtask';
import { XMarkIcon } from '@heroicons/react/24/solid'
import axios from 'axios';
import moment from 'moment';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
    closeAddtask: any
}
const AddTask = ({closeAddtask}:Props) => {
    
    const isScreens560px = useMediaQuery("(min-width: 560px)")
    const { currentUser }:any = useContext(AuthContext)

    const [title, setTitle] = useState('')
    const [cat, setCat] = useState('')
    const [subTask, setSubTask] = useState('')
    const [getNote, setGetNote] = useState('')

    const [showMsg, setShowMsg] = useState('')

    const navigate = useNavigate()

    const handleTaskSubmit = async (e:any) => {
        e.preventDefault()

        if(title&&cat&&subTask&&getNote){
            try {
                const sendTask = await axios.post(`${Proxy}/tasks/`, {
                title:title, cat:cat, date:new Date().getTime(), subtask:seperateSubtask(subTask), note:getNote,  userId:currentUser.id,  
                token:currentUser.token})

                setShowMsg(sendTask.data)
                setTimeout(() => { closeAddtask()/*location.reload()*/ }, 3000)
                
                
            } catch (error) {
                console.log(error)
            }
        }else{setShowMsg('Empty Inputs!'), setTimeout(() => { setShowMsg('') }, 3000)}


    }

    const ListCat = () => {
        return (
            ['Personal','Work','Important'].map((eachCat) => (
                <div className='flex gap-1 mt-[2px]' key={eachCat}>
                    <input type="radio" id={eachCat} name='cat' value={eachCat} onChange={(e:any) => setCat(e.target.value)} />
                    <label htmlFor={eachCat}>{eachCat}</label>
                </div>
            ))
        )
    }

    return (
        <div className={`w-full h-[100vh] bg-black/50 ${!isScreens560px ? 'fixed':'absolute'} flex justify-center items-center`}>
            <div className={`${!isScreens560px ? 'w-[95%]': 'w-1/2'} flex flex-col items-center bg-white p-10 rounded-md relative`}>
                <XMarkIcon className='h-[22px] absolute top-5 right-5 cursor-pointer' onClick={closeAddtask}/>
                <div className='w-full'>
                    <label className='text-primary-100 font-extrabold'>Task Title:</label>
                    <input type="text" onChange={(e) => setTitle(e.target.value)} className='outline-primary-300 mb-2 border-[2px] rounded-md p-2 w-full' placeholder='Check for software updates'/>
                </div>
                <div className='w-full'>
                    <label className='text-primary-100 font-extrabold'>Sub Task: <span className='font-[100] italic'>seperate subtasks with "|"</span></label>
                    <input type="text" onChange={(e) => setSubTask(e.target.value)} className='outline-primary-300 mb-2 border-[2px] rounded-md p-2 w-full' placeholder='Operating system, apps, drivers ...'/>
                </div>
                <div className='w-full'>
                    <label className='text-primary-100 font-extrabold'>Add Note:</label>
                    <input type="text" onChange={(e) => setGetNote(e.target.value)} className='outline-primary-300 mb-2 border-[2px] rounded-md p-2 w-full' placeholder='Finish the work before the weekend'/>
                </div>
                <div className='w-full mb-3'>
                    <label className='text-primary-100 font-extrabold'>Category:</label>
                    {ListCat()}
                </div>
                <p className='my-2 h-[25px] text-primary-500'>{showMsg && showMsg}</p>
                <button className={`text-white font-bold bg-primary-500 px-3 py-2 rounded-md ${!isScreens560px ? 'w-[80%]': 'w-1/2'} hover:opacity-70`} onClick={handleTaskSubmit}>Register Task</button>
            </div>
        </div>
    )
}

export default AddTask