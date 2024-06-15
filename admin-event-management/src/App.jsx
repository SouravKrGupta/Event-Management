import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Edit from './pages/Edit/Edit'
import Order from './pages/Orders/Order';
const App = () => {
  const url= "http://localhost:8080"
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path='/' element={<Add/>}/>
          <Route path='/list' element={<List/>}/>
          <Route path='/edit/:id' element={<Edit/>}/>
          <Route path='/attendee' element={<Order/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App