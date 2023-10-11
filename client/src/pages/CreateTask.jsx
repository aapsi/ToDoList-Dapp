import React from 'react'
import { useState } from "react";

const CreateTask = ({state}) => {

  const createTask = async(event) => {
    event.preventDefault();
    const {contract, account} = state;
    const taskName = document.querySelector("#taskName").value;
    const taskDate = document.querySelector("#taskDate").value;

    try{
      const res = await fetch("http://localhost:5173/api/ethereum/create-task",
      {
        method: "POST",
        headers: {
          "content-type": "application/json"
        }, body: JSON.stringify({taskDate: taskDate})
      })
      const data = await res.json()
    }
    catch(error){
      
    }

  }

  return (
    <div>
      <form onSubmit={createTask}>
        <label>
          Name:
          <input id = "taskName"></input>
        </label>
        <label>
          Date:
          <input id = "taskDate"></input>
        </label>
        <button type='submit'>
          Create Task
        </button>
      </form>
    </div>
  )
}

export default CreateTask