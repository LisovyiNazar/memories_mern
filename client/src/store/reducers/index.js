import { combineReducers } from 'redux'
import postsReduser from './post.reducers' 

export default combineReducers({
    posts: postsReduser
})