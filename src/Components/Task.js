import React from 'react'

const Task = ({task,delteTask,editTask}) => {
  return (
    <div className='flex w-[56vw] items-center justify-between  border rounded-md border-t-4 p-3 m-2' onDoubleClick={()=>{
        
    }}>
        <div>{task?.title}</div>
        <div>{task?.description!="not available" && task?.description}</div>
        <button onClick={()=>{
          delteTask(task.id);
        }} className='border bg-red-600 border-black border-t-2 text-white p-3 rounded-lg'>delete</button>
    </div>
  )
}

export default Task;
