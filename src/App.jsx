import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import SearchPage from './pages/searchpage';
import Details from './pages/detailshotel';
import About from './pages/about';
import Contact from './pages/contact';
import FlightSearch from './pages/flight';
import FlightResults from './pages/searchflight';
import Register from './pages/register';
import Login from './pages/login';
import Booking from './pages/booking';
import Payment from './pages/payment';
import Footer from './components/footer';

function App() {
  return (
    <>
    
      <Navbar />
      
    
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/search" element={<SearchPage />} />
        <Route path="/hotel/:id" element={<Details />} />
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/flights' element={<FlightSearch/>}/>
        <Route path='/flights/search' element={<FlightResults/>}/>
        <Route path="/booking/:id" element={<Booking />} />
        <Route path='/register' element={<Register/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='/payment' element={<Payment/>}/>


      </Routes>
    
    <Footer/>
    </>
  );
}

export default App;
