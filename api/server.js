const express = require('express')
const ABI = require("./ABI.json");
const cors = require("cors")
const  {Web3} = require('web3');

// to run the server
const app = express();
app.use(cors());

// adding rpc
const web3 = new Web3("https://sepolia.infura.io/v3/0717d56f5a4542e5aa40e0bb1f4a39ca")

const contractAddress = "0x34bc0b6bde2bad3c21a0ec3a155ee17b000fa00a"

// CREATING INSTANCE OF CONTRACT
const contract = new web3.eth.Contract(ABI, contractAddress);

const dateclashCheck = async(taskDate) => {
    const tasks = await contract.methods.allTask().call();
    const foundTask = tasks.find(task=>task.date === taskDate);

    if(foundTask){
        return  foundTask.name;
    }
    return "No Task Found";
}

app.post("/api/ethereum/create-task", async(req, res) => {
    // you cannot do this because to write to a blockchain you need to provide your address and private key 
    // but here we will be giving the server our private keys and that's stupid :)
    
    // await contract.methods.createTask("blockchain", "11/10/").send({from:"0x......."})
    const {taskDate} = req.body;
    const task = await dateclashCheck(taskDate);
    try{
        if(task==="No Task Found"){
            res.status(200).json({status:200, message:"Task can be added"})
        }
    }catch(error){
        console.error(ErrorDescription)
}

})

app.get("/api/ethereum/view-task/:taskId", async(req, res) => {

    try {
        const {taskId} = req.params;
        const task = await contract.methods.viewTask(taskId).call();
        // fetching these from task
        const{id, name, date} = task;
        // we have to do this because we have values in bigint format
        const numId = Number(id);
        const taskObj = {
            numId, name, date
        }
        // success code
        res.status(200).json({status:200, taskObj, message:"Task Exist"})
    }catch(error) {
        res.status(404).json({status:404, message: "Task ID does not exist"})
        console.error(error)
    }
    
})

app.get("/api/ethereum/view-all-tasks", async(req,res) => {
    try{
        const tasks = await contract.methods.allTask().call();
        if(tasks.lenght<0){
            res.status(404).json({status:404, message: "Task List Does Not Exist"});
        }
        else{
            const taskList = tasks.map(({id, name, date}) =>{
                const taskId = Number(id);
                return {taskId, name, date};
            })
            res.status(200).json({status:200, taskList, message: "Task Exist"})
        }
    }
    catch(error){
        console.log(error)
    }
})

const PORT = 5173;


// checking if server is running or not
app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`)
})