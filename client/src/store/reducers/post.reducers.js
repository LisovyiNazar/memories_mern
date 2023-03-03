import { FETCH_ALL_POSTS, CREATE_POST } from "../types/posts.types"

const postsReduser = (state = [], action) => {
    switch (action.type) {
        case FETCH_ALL_POSTS:
            return action.payload
        case CREATE_POST:
            return [...state, action.payload]
        default:
            return state
    }
}

export default postsReduser