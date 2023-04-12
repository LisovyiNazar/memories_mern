import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '../Navbar'
import Home from '../Home'
import Auth from '../Auth'
import './index.scss'

const App = () => {

    return (
        <BrowserRouter>
            <div className='app-container'>
                <Navbar />
                <Routes>
                    <Route path='/' exact element={<Home />} />
                    <Route path='/auth' exact element={<Auth />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App