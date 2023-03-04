import { FETCH_ALL_POSTS, CREATE_POST, UPDATE_POST } from "../types/posts.types"

const postsReduser = (state = [], action) => {
    switch (action.type) {
        case FETCH_ALL_POSTS:
            return action.payload
        case CREATE_POST:
            return [...state, action.payload]
        case UPDATE_POST:
            return state.map((post) => post._id === action.payload._id ? action.payload : post)
        default:
            return state
    }
}

export default postsReduser