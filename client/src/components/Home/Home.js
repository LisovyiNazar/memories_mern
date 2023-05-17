import React from 'react'
import Posts from '../Posts'
import Form from '../Form'
import './index.scss'

const Home = () => {
    
    return (
        <div className='home-wrapper'>
            <Posts />
            <div className='sidebar'>
                <Form />
            </div>
        </div>
    )
}

export default Home