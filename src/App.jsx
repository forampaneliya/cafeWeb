
import { useState } from 'react'
import './App.css'
import Footer from './layout/Footer'
import AllRoute from './AllRoute'
import Navbar from './layout/Navbar'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function App() {

  return (
    <>
      <Navbar/>
      <AllRoute/>
      <Footer />
    </>
  )
}

export default App
