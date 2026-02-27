
import { useEffect, useState } from 'react'
import './App.css'
import Footer from './Layyout/Footer'
import AllRoute from './AllRoute'
import Navbar from './Layyout/Navbar'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loader from './Pages/Components/Loader'


function App() {
    const [loading, setLoading] = useState(true);
useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    {loading ? (
        <Loader />
      ) : (
              <>
          <Navbar />
          <AllRoute />
          <Footer />
        </>
      )}
    </>
  );
}


export default App
