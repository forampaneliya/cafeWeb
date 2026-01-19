import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homee from './pages/Homee'

function AllRoute() {
  return (
    <>
        <Routes>

            <Route path='/' element={<Homee/>}/>
        </Routes>
    </>
  )
}

export default AllRoute