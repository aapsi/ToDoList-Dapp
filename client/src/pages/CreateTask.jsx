import Navigation from "./Navigation";

const CreateTask =({state})=>{

    const createTask = async(event)=>{
        event.preventDefault();
        const {contract,account}=state;
        const taskName = document.querySelector("#taskName").value;
        const taskDate = document.querySelector("#taskDate").value;
        console.log(taskName)
        console.log(state)

        try{
            const res = await fetch("http://localhost:5173/api/ethereum/create-task",{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({taskDate:taskDate})
            })
            console.log(account)
            console.log(res)
            const data = await res.json()
            console.log(data)
            if(data.status===200){
                if(contract && contract.methods){
                    await contract.methods
                    .createTask(taskName,taskDate)
                    .send({from:account})
                }
            }else{
                alert("Task cannot be added")
            }

        } 
        catch (error) {
          console.log(error)
          }
    }
    return(
        <div>
          <Navigation />
          <div className="create_task todo_btn">
            <form onSubmit={createTask}>
              <label>
                Name:
                <input id="taskName" />
              </label>
              <label>
                Date:
                <input id="taskDate" type="date" />
              </label>
              <button type="submit">Create Task</button>
            </form>
          </div>
        </div>
      )
}
export default CreateTask;
