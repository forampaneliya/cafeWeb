import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homee from './pages/Homee'
import About from './Pages/About'
import Menu from './pages/Menu'

function AllRoute() {
  return (
    <>
        <Routes>

            <Route path='/' element={<Homee/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path='/menu' element={<Menu/>}/>
        </Routes>
    </>
  )
}

export default AllRoute