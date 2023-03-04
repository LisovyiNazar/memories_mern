import axios from 'axios'

export const fetchPosts = () => axios.get('/posts')
export const createPost = (newPost) => axios.post('/posts', newPost)
export const updatePost = (id, postData) => axios.patch(`/posts/${id}`, postData)
export const deletePost = (id) => axios.delete(`/posts/${id}`)