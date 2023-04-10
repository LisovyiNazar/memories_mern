import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core'
import MemoriesPhoto from '../../images/memories.png'
import { logout } from '../../store/actions/auth.actions'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './styles'

const Navbar = () => {
    const classes = useStyles()
    const dispath = useDispatch()
    const { authenticate, user } = useSelector(state => state.auth)

    return (
        <AppBar 
            className={classes.appBar}
            position='static' 
            color='inherit'
        >
            <div className={classes.brandContainer}>
                <Typography 
                    component={Link}
                    to='/'
                    className={classes.heading} 
                    variant='h2' 
                    align='center'
                >
                    Memories
                </Typography>
                <img 
                    className={classes.image} 
                    src={MemoriesPhoto} 
                    alt='' 
                    height='60' 
                />
            </div>
            <Toolbar className={classes.toolbar}>
                {
                    authenticate ? (
                        <div className={classes.profile}>
                            <Typography 
                                className={classes.userName} 
                                variant='h6' 
                            >
                                {
                                    `${user.firstName} ${user.lastName}`
                                }
                            </Typography>
                            <Button
                                onClick={() => dispath(logout())}
                                variant='contained'
                                className={classes.logout} 
                                color='secondary'
                            >
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <Button 
                            component={Link}
                            to='/auth'
                            variant='contained'
                            color='primary'
                        >
                            Sign In
                        </Button>
                    )
                }
            </Toolbar>
        </AppBar>
    )
}

export default Navbar