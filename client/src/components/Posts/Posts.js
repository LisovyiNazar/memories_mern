import React from 'react'
import { useSelector } from 'react-redux'
import Post from './Post'
import useStyles from './styles'

const Posts = () => {
    const classes = useStyles()
    const posts = useSelector(state => state.posts)
    console.log(posts);

    return (
        <div className=''>
            Posts
            <Post />
        </div>
    )
}

export default Posts