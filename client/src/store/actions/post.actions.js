import * as api from '../../api'
import { FETCH_ALL_POSTS } from '../types/posts.types'

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

