import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Container } from '@material-ui/core'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Auth from './components/Auth'

const App = () => {

    return (
        <BrowserRouter>
            <Container maxWidth='lg'>
                <Navbar />
                <Routes>
                    <Route path='/' exact element={<Home />} />
                    <Route path='/auth' exact element={<Auth />} />
                </Routes>
            </Container>
        </BrowserRouter>
    )
}

export default App