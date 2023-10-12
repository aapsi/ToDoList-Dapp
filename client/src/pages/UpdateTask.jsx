import React from 'react'
import Navigation from './Navigation';

const UpdateTask = ({state}) => {
  const {contract,account}=state;
  const updateTask=async(event)=>{
      event.preventDefault();
      const taskName = document.querySelector("#taskName").value;
      const taskDate = document.querySelector("#taskDate").value;
      const taskID = document.querySelector("#taskID").value;

      try{
        const res = await fetch(
          "http://localhost:5173/api/ethereum/update-task",
          {
              method:"POST",
              headers:{
                  "content-type":"application/json"
              },
              body:JSON.stringify({taskDate:taskDate})
          }
        )
        const data = await res.json();
        if(data.status===200){
          await contract.methods.updateTask(taskID,taskName,taskDate).send({from:account});
        }else{
          throw new Error("Task cannot be updated because of date clash")
        }

      }catch (error) {
      }
    }

  return (
    <div>
      <Navigation/>
      <form onSubmit={updateTask}>
          <label>
            ID:
            <input id="taskID" />
          </label>
          <label>
            Name:
            <input id="taskName" />
          </label>
          <label>
            Date:
            <input id="taskDate" type="date" />
          </label>
          <button type="submit">Update Task</button>
        </form>
    </div>
  )
}

export default UpdateTask