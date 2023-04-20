import React from 'react'
import Post from './Post'
import { useSelector } from 'react-redux'
import './index.scss'

const Posts = () => {
    const posts = useSelector(state => state.posts)

    return (
        !posts.length ? (
            <></>
        ) : (
            <>
                {
                    posts.map(post => (
                        <Post key={post._id} post={post} />
                    ))
                }
            </>
        )
    )
}

export default Posts