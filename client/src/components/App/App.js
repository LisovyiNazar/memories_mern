import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../Home'
import Auth from '../Auth'
import SecurePath from '../SecurePath'
import './index.scss'

const App = () => {

    return (
        <BrowserRouter>
            <div className='app-container'>
                <SecurePath/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/auth' element={<Auth/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App