import React from 'react'
import Post from './Post'
import { Grid, CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux'
import './index.scss'

const Posts = () => {
    const posts = useSelector(state => state.posts)

    return (
        !posts.length ? (
            <CircularProgress />
        ) : (
            <div className='posts-container'>
                {
                    posts.map(post => (
                        <Post post={post} />
                    ))
                }
            </div>
        )
    )
}

export default Posts