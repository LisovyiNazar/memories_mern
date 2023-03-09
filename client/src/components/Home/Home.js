import React, { useEffect } from 'react'
import { Container, Grow, Grid } from '@material-ui/core'
import Posts from '../Posts'
import Form from '../Form'
import { useDispatch } from 'react-redux'
import { getPosts } from '../../store/actions/post.actions'
import useStyles from './styles'

const Home = () => {
    const classes = useStyles()
    const dispath = useDispatch()

    useEffect(() => {
        dispath(getPosts())
    }, [dispath])
    
    return (
        <Grow in>
            <Container>
                <Grid 
                    className={classes.mainContainer}
                    container 
                    justifyContent='space-between' 
                    alignItems='stretch' 
                    spacing={3}
                >
                    <Grid item xs={12} sm={7}>
                        <Posts />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home