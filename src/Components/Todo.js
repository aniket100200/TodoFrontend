import React, { useEffect, useState } from 'react'
import Task from './Task';

const Todo = () => {
    const [data, setData] = useState([]);
    const [myData, setMyData] = useState([]);
    const [input, setInput] = useState("");
    const[description,setDescription] = useState("");
    const[note,setNote] = useState("hidden");
    const[noteVal,setNoteVal] = useState("");
    let tI=null;
    const baseUrl="https://todo-production-0745.up.railway.app/"

    useEffect(() => {
        const getData = async () => {
            const resp = await fetch(`${baseUrl}todo/getAll`);
            const json = await resp.json();
            setData(json);
            console.log(json);
        }
        getData()
    }, [myData]);

    const addTask = async () => {

        for(let i=0;i<data.length;i++) {
            if(data[i].title=== input) {
                    alert("This task has aleady added to the list");
                   return;
            }
        }
        const resp = await fetch(`${baseUrl}todo/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'title': input,
                'description': description&&description,
                'startTime': '10:02:00',
            })
        });

        setMyData([...data, { "temp": "love" }]);
        setInput("");
        setDescription("");

        if(resp.ok){
            setNote("border border-green-500 bg-green-400 h-[100px] w-[210px] flex items-center justify-center fixed right-10 bottom-10 rounded-lg");
            setNoteVal("Added SuccessFully!!");
          const tid = setTimeout(()=>{
                 setNote("hidden");
                 setNoteVal("");
            },3000);
            tI= tid;
        }
        
    };


    const delteTask = async (id) => {

        const resp = await fetch(`${baseUrl}todo/delete?id=${id}`, {
            method: 'DELETE',
           headers: { 'Content-Type': 'application/json'},
        });

        if(resp.ok){
            setNote("border border-green-500 bg-red-400 h-[100px] w-[210px] flex items-center justify-center fixed right-10 bottom-10 rounded-lg");
            setNoteVal("Deleted Successfully");
            const tid = setTimeout(()=>{
                setNote("hidden");
                setNoteVal("");
           },3000);
           tI= tid;
        }else{
            alert("Failed to delete");
        }

        setMyData([]);
    }

    return (
        <div className='flex flex-col items-center h-screen bg-gradient-to-r from-blue-100 to-purple-200 p-8'>
            <div className='flex flex-col gap-7 w-[60vw] p-5 bg-white shadow-2xl rounded-xl'>
                <h1 className="font-extrabold text-4xl text-gray-800 mb-4 text-center">To-Do List</h1>
                <div className='flex justify-between items-center'>
                   <div className='flex flex-col items-center'>
                   <input
                        type='text'
                        placeholder='Enter your task...'
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e)=>{
                            if(e.key === 'Enter'){
                                addTask();
                            }
                        }}
                        value={input}
                        className='p-3 m-2 border border-gray-300 rounded-xl w-[75%] shadow-md focus:ring-2 focus:ring-blue-400 transition duration-200'
                    />

                    <textarea onChange={(e)=>{
                        setDescription(e.target.value);
                    }} value={description} className='p-3 m-2 border border-gray-300 rounded-xl w-auto shadow-md focus:ring-2 focus:ring-blue-400 transition duration-200' placeholder='Description'>

                    </textarea>
                   </div>
                    <button
                        className='border border-transparent px-6 py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-500 shadow-lg transform hover:scale-105 transition duration-300'
                        onClick={addTask}
                    >
                        Add Task
                    </button>
                </div>
            </div>

            <h1 className='font-bold text-4xl mt-12 text-gray-800 tracking-wide'>Your Tasks</h1>

            <div className='w-[75vw] h-[50vh] overflow-y-auto mt-6 border border-gray-300 rounded-lg shadow-lg bg-white p-6'>
                {
                    data.length ? (
                        <ul className="space-y-4">
                            {
                                data.map(item => (
                                    <li
                                        key={item.id}
                                        className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                                    >
                                        <Task task={item} delteTask={delteTask} />
                                    </li>
                                ))
                            }
                        </ul>
                    ) : (
                        <p className="text-gray-500 text-xl text-center mt-10 font-semibold">No tasks available. Add a new task to get started!</p>
                    )
                }
            </div>
            <div className={note}>
                <button onClick={()=>{setNote("hidden"); clearTimeout(tI);}} className='absolute right-2 top-0'>X</button>
                  <p>{noteVal}</p>
            </div>

        </div>
    )
}

export default Todo;
