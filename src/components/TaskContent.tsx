import { subtask, taskContentType } from '@/shared/defineTypes'
import { ClockIcon, NewspaperIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { IdelImg } from './useimg'
import axios from 'axios'
import Proxy from '@/shared/Proxy'

const minBox = ['Cat Showroom Welcome']

type Props = {
    showContent: taskContentType 
}
const TaskContent = ({showContent}:Props) => {
    window.scrollTo({ top: 0, left: 0})
    
    const [subTask,setSubTask] = useState<Boolean>(false)
    const [newsubTask,setNewsubTask] = useState('') 
    
    
    const [makeEdit,setMakeEdit] = useState<Boolean>(false)
    const [newNote,setNewNote] = useState('') 

    const [taskEdit,setTaskEdit] = useState(false) 
    const [tasktitle,setTasktitle] = useState('') 
    
    useEffect(() => {
        setNewNote(showContent.note)
        setTasktitle(showContent.title)
    },[showContent])

    const editTitle = () => {

        const updateTask = async () => {
            try {
                await axios.put(`${Proxy}/tasks/${showContent.id}`, {title:tasktitle}) 
            } catch (error) { console.log(error) }
        }
        
        showContent.title = tasktitle

        return(
            <div className='flex'>
                <input type="text" autoFocus onChange={(e) => {setTasktitle(e.target.value)}} className='border-[1px] border-primary-500 outline-none px-2' value={tasktitle}/>
                <button onClick={() => {setTaskEdit(false), setNewsubTask(''), updateTask()}} className='text-white font-bold bg-primary-500 py-1 p-2 hover:opacity-80'>Edit</button>
            </div>
        )

    }

    const editNote = () => {

        const updateNote = async () => {
            try {
                await axios.put(`${Proxy}/tasks/${showContent.id}`, {note:newNote}) 
            } catch (error) { console.log(error) }
        }

        showContent.note = newNote
        return(
            <>
                <textarea name="" onChange={(e) => {setNewNote(e.target.value)}} className='outline-none border-2 resize-none h-[200px] p-3' value={newNote}></textarea>
                <button onClick={() => {setMakeEdit(false),updateNote()}} className='text-white font-bold bg-primary-500 py-1 rounded-md w-full hover:opacity-80'>Update Note</button>
            </>
        )
    }
    
    const renderSubTask = () => {
        
        return (
            <>
                {showContent.subtask.map((each:subtask) => (
                    <div key={each.id}>
                        <input type="radio" checked={false} readOnly className='mr-3' name={each.descrp} id="" value={each.descrp} />
                        <label htmlFor={each.descrp}>{each.descrp}</label>
                    </div>
                ))}
            </>
        )
    }
    
    const addSubTask = () => {
        const subId = Math.floor((new Date).getTime()/1000)
        const updatesubTask = async () => {
            try {
                await axios.put(`${Proxy}/tasks/${showContent.id}`, {subtask:showContent.subtask}) 
            } catch (error) { console.log(error) }
        }
        return(
            <div className='flex'>
                <input type="text" autoFocus onChange={(e) => {setNewsubTask(e.target.value)}} className='border-[1px] border-primary-500 outline-none px-2' placeholder='new sub task' />
                <button onClick={() => {setSubTask(false), newsubTask && showContent.subtask.push({id:subId,descrp:newsubTask,status:0}), setNewsubTask(''), updatesubTask()}} className='text-white font-bold bg-primary-500 py-1 p-2 hover:opacity-80'>Add</button>
            </div>
        )
    }

    return (
        <div>
            {showContent.id ? 
            <>
                <div>
                    <h1 className='text-primary-500'>{showContent.cat} {">"}</h1>
                    {taskEdit ? 
                        editTitle()
                    :
                        <h1 className='font-bold border-b-[2px] w-[85%] flex'>{tasktitle} <PencilSquareIcon className='h-[20px] ml-2 cursor-pointer' onClick={() => {setTaskEdit(true)}}/></h1>
                    }
                </div>
                <div className='py-3 border-b-[2px]'>
                    {renderSubTask()}
                    {subTask ? 
                        addSubTask()
                    :
                        <button className='text-primary-500 ml-5' onClick={() => {setSubTask(true)}}>+ Add Sub Task</button>
                    }
                </div>
                <div>
                    <h1 className='flex text-primary-500 text-1xl mr-5 my-5'>
                        <ClockIcon className=' h-[22px] mr-3'/>
                        <span>{`Created on ${new Date(Number(showContent.date)).toLocaleString('en-US', {weekday:'short',month:'short',year:'numeric',hour:'numeric',minute:'numeric',hour12:true})}`}</span>
                    </h1>
                    <div className='flex my-5'>
                        <NewspaperIcon className='text-primary-500 h-[22px] mr-3'/>
                        <div>
                            <button className='cursor-pointer flex text-primary-500 '>Edit Note<PencilSquareIcon className='h-[20px] ml-2' onClick={() => {setMakeEdit(true)}}/></button>
                            {makeEdit ? 
                                editNote()
                            :
                                <h1 className='text-gray-500 mt-3'>{newNote}</h1>
                            }
                        </div>
                    </div>
                </div>
            </>
            :
            <div className='flex text-center flex-col h-[90vh] w-full items-center justify-center'>
                <img className='' src={IdelImg} alt="" />
                <h1>Click on any task to view full content</h1>
            </div>
            }
        </div>
    )
}

export default TaskContent