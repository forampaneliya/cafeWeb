import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homee from './Pagges/Homee'
import About from './Pagges/About'
import Gallery from './Pagges/Gellary'
import ContactUs from './Pagges/ContactUs'
import Franchise from './Pagges/Franchise'
import Menu from './Pagges/Menu'

function AllRoute() {
  return (
    <>
        <Routes>

            <Route path='/' element={<Homee/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/menu" element={<Menu/>}/>
            <Route path="/gellary" element={<Gallery/>}/>
            <Route path="/franchise" element={<Franchise/>}/>
            <Route path="/contact" element={<ContactUs/>}/>
        </Routes>
    </>
  )
}

export default AllRoute