import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homee from './pages/Homee'
import About from './Pages/About'
import Menu from './Pages/Menu'
import OurStory from './Pages/Gellary'
import Gallery from './Pages/Gellary'
import ContactUs from './Pages/ContactUs'
import Franchise from './Pages/Franchise'

function AllRoute() {
  return (
    <>
        <Routes>

            <Route path='/' element={<Homee/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/menu" element={<Menu/>}/>
            <Route path="/ourStory" element={<OurStory/>}/>
            <Route path="/gellary" element={<Gallery/>}/>
            <Route path="/franchise" element={<Franchise/>}/>
            <Route path="/contact" element={<ContactUs/>}/>
        </Routes>
    </>
  )
}

export default AllRoute