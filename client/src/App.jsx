import {useState} from "react";
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import CreateTask from "./pages/CreateTask"
import DeleteTask from "./pages/DeleteTask"
import Navigation from "./pages/Navigation"
import ViewTask from "./pages/ViewTask"
import UpdateTask from "./pages/UpdateTask"
import Wallet from "./pages/Wallet"
import ViewAllTasks from "./pages/ViewAllTasks"
import './App.css';

function App() {
  const {state, setState} = useState({web3:null, contract:null, account:null})

  const router = createBrowserRouter([
    {path: '/', element:<Wallet/>},
    {path: '/view-all-tasks', element:<ViewAllTasks/>},
    {path: '/create-task', element:<CreateTask/>},
    {path: '/view-task', element:<ViewTask/>},
    {path: '/update-task', element:<UpdateTask/>},
    {path: '/delete-task', element:<DeleteTask/>},
  ])
  return (
    <div className="App">
      <RouterProvider router = {router}/>
    </div>
  );
}

export default App;
