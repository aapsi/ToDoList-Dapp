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
  const [state, setState] = useState({ web3: null, contract: null, account: null });

  const saveState = ({ web3, contract, account }) => {
    setState({ web3: web3, contract: contract, account: account });
  }

  const router = createBrowserRouter([
    // we are doing this to send data from wallet component to app component
    {path: '/', element:<Wallet saveState = {saveState} />},
    {path: '/view-all-tasks', element:<ViewAllTasks/>},
    // we can use state here as it has everything that we need present in it 
    {path: '/create-task', element:<CreateTask state = {state}/>},
    {path: '/view-task', element:<ViewTask/>},
    //  passing a prop state because its a write operation and we need it
    {path: '/update-task', element:<UpdateTask state = {state}/>},
    {path: '/delete-task', element:<DeleteTask state = {state}/>},
  ])
  return (
    <div className="App">
      <RouterProvider router = {router}/>
    </div>
  );
}

export default App;
