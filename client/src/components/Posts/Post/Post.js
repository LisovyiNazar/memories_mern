import React, { useContext } from 'react'
import useStyles from './styles'
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../../store/actions/post.actions'
import { PostForEditContext } from '../../../store/context/postForEdit.context'
import { 
    Card, 
    CardActions, 
    CardContent, 
    CardMedia, 
    Button, 
    Typography 
} from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbDownAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'

const Post = ({ post }) => {
    const classes = useStyles()

    const dispath = useDispatch()

    const { setPostForEdit } = useContext(PostForEditContext)

    const deletePostHandler = (id) => {
        dispath(deletePost(id))
    }

    const likePostHandler = (id) => {
        dispath(likePost(id))
    }

    return (
        <Card className={classes.card}>
            <CardMedia 
                component="img" 
                src={post.selectedFile ? post.selectedFile : 'https://catalystcci.com/wp-content/uploads/gray-image-placeholder.png'} 
                title={post.title} 
                alt=""
            />
            <div className={classes.overlay}>
                <Typography variant='h6'>{post.creator}</Typography>
                <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button 
                    style={{color: 'white'}} 
                    size='small' 
                    onClick={() => {setPostForEdit(post)}} 
                >
                    <MoreHorizIcon fontSize='medium' />
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant='body2' >
                    {
                        post.tags.map((tag) => `#${tag} `)
                    }
                </Typography>
            </div>
            <Typography 
                    className={classes.title} 
                    variant='h5' 
                    gutterBottom 
                >
                    {post.title}
                </Typography>
            <CardContent>
                <Typography 
                    variant='body2'
                    color= 'textSecondary'
                    component='p'
                >
                    {post.message}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary' onClick={() => { likePostHandler(post._id) }} >
                    <ThumbUpAltIcon fontSize='small' /> Like {post.likeCount}
                </Button>
                <Button size='small' color='primary' onClick={() => { deletePostHandler(post._id) }} >
                    <DeleteIcon fontSize='small' />
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
}

export default Post