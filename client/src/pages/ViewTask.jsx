import React from 'react'
import { useState } from "react"

const ViewTask = () => {
  const [task, setTask] = useState([]);

  const viewTask = async(event) => {
    try{
      event.preventDefault()
      const taskID = document.querySelector("#taskID").value;
      const res = await fetch(`http://localhost:5173/api/ethereum/view-task/${taskID}`,
      {
        method: "GET",
        headers: {
          "content-type":"application/json"
        }
      })
      console.log(res);

      // if (res.ok) {
      //   const data = await res.json();
      //   console.log(data);
      // } else {
      //   console.log("Response not OK:", res.status, res.statusText);
      // }

      const data = await res.json();
      if(data.status == 200) {
        setTask(data.taskObj)
      }
      console.log(data)
    } 
    catch(error){
      console.log(error)
    }

  }

  return (
    <div>
      <form onSubmit={viewTask}>
        <label>
          ID:
          <input id = "taskID"></input>
        </label>
        <button type='submit'>
          View Task
        </button>
      </form>
    </div>
  )
}

export default ViewTask