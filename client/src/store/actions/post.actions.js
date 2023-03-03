import * as api from '../../api'
import { FETCH_ALL_POSTS, CREATE_POST } from '../types/posts.types'

export const getPosts = () => async (dispath) => {
    try {
        const { data } = await api.fetchPosts()
        
        dispath({
            type: FETCH_ALL_POSTS,
            payload: data ? data : []
        })
    } catch (error) {
        console.log(error.message);
    }

}

export const createPost = (post) => async (dispath) => {
    try {
        const { data } = await api.createPost(post)
        
        dispath({
            type: CREATE_POST,
            payload: data 
        })
    } catch (error) {
        console.log(error.message);
    }

}
