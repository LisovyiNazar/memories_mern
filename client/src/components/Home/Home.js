import React, { useEffect } from 'react'
import Posts from '../Posts'
import Form from '../Form'
import { useDispatch } from 'react-redux'
import { getPosts } from '../../store/actions/post.actions'
import './index.scss'

const Home = () => {
    const dispath = useDispatch()

    useEffect(() => {
        dispath(getPosts())
    }, [dispath])
    
    return (
        <div className='home-wrapper'>
            <div className='posts-wrapper'>
                <Posts />
            </div>
            <div className='form-wrapper'>
                <Form />
            </div>
        </div>
    )
}

export default Home