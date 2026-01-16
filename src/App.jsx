
import { useState } from 'react'
import './App.css'
import Footer from './layout/Footer'
import AllRoute from './AllRoute'
import Navbar from './layout/Navbar'

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
