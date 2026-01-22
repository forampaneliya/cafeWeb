import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homee from './pages/Homee'
import About from './Pages/About'

function AllRoute() {
  return (
    <>
        <Routes>

            <Route path='/' element={<Homee/>}/>
            <Route path="/about" element={<About/>}/>
        </Routes>
    </>
  )
}

export default AllRoute