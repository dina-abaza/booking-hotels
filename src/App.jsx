import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import SearchPage from './pages/searchpage';
import Details from './pages/detailshotel';
import About from './pages/about';
import Contact from './pages/contact';
import Register from './pages/register';
import Login from './pages/login';
import Booking from './pages/booking';
import Footer from './components/footer';
import NotFound from './pages/notfound';
import ScrollToTop from './hooks/scroolToTop';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className='min-h-screen overflow-x-hidden bg-black'>
    <ScrollToTop/>
      <Navbar />
      
    
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/search" element={<SearchPage />} />
        <Route path="/hotel/:id" element={<Details />} />
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path="/booking/:id" element={<Booking />} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="*" element={<NotFound />} />


      </Routes>
    
    <Footer/>
    <ToastContainer 
  position="bottom-right"
  autoClose={2000}   // يقفل بعد ثانيتين بدل 5 ثواني الافتراضي
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={true}         // بما إن المحتوى عربي يخليه RTL
  pauseOnFocusLoss
  draggable
  pauseOnHover
/>
    </div>
  );
}

export default App;
