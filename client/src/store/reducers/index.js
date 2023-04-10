import { combineReducers } from 'redux'
import postsReduser from './post.reducers' 
import authReduser from './auth.reducer'

export default combineReducers({
    posts: postsReduser,
    auth: authReduser
})