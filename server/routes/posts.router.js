import express from 'express'

const postsRouter = express.Router({ mergeParams: true })

postsRouter.get('/', (req, res) => {
    res.send('THIS WORKS!')
})

export default postsRouter