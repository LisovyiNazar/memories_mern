import React from 'react'
import Posts from '../Posts'
import Form from '../Form'
import './index.scss'

const Home = () => {
    
    return (
        <div className='home-wrapper'>
            <Posts />
            <div className='form-wrapper'>
                <Form />
            </div>
        </div>
    )
}

export default Home