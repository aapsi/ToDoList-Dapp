import React from 'react'
import { useState, useEffect } from 'react'

const ViewAllTasks = () => {
  const [taskList, setTaskList] = useState([]);

  useEffect(()=>{
    const allTask = async() => {
      try{
        // here you are sending a request to the server
        const res = await fetch("http://localhost:5173/api/ethereum/view-all-tasks",
        {
          method: "GET",
          headers: {
            "content-type":"application/json"
          }
        }
          )
          const data = await res.json();
          if(data.status == 200){
            setTaskList(data.taskList)
          }
      }
      catch(error){
        console.log(error)
      }
    }

  }, [])

  return (
    <div>ViewAllTasks</div>
  )
}

export default ViewAllTasks