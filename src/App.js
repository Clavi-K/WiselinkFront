import './App.css';

import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import { useSelector } from 'react-redux';
import Register from './components/Register/Register';
import Login from './components/Login/Login';

function App() {

  const userInfo = useSelector(state => state.userInfo)

  return (<>
    <Navbar userInfo={userInfo} />

    <Routes>
      <Route path='/' element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>

  </>);
}

export default App;
