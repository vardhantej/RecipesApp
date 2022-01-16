import React,{useState,useEffect} from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';


export default function App() {
    
    const [isLoggedOut,setIsLoggedOut]=useState(true);
    
    return (
        <div>
            <BrowserRouter basename='/'>
                <NavBar isLoggedOut={isLoggedOut} setIsLoggedOut={setIsLoggedOut}/>
                        <Routes>
                            <Route path="/" element={<Auth isLoggedOut={isLoggedOut} setIsLoggedOut={setIsLoggedOut}/>}/>
                            <Route path="/home" element={<Home/>}/>
                        </Routes>
                </BrowserRouter>
                    
        </div>
    )
}
