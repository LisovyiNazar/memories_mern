import React, { useState } from 'react'
import { Avatar, Paper, Container, Typography, Grid, Button } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input'
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'
import useStyles from './styles'

const Auth = () => {
    const classes = useStyles()
    
    const [isSignUp, setIsSignUp] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = () => {
        
    }

    const handleChange = () => {
        
    }

    const handleShowPassword = () => {
        setShowPassword(prev => !prev)
    }

    const switchAuthMode = () => {
        setIsSignUp(prev => !prev)
    }

    const googleSuccess = async (res) => {
        console.log(jwt_decode(res?.credential));
    }

    const googleFailure = () => {
        console.log(`Google 'Sing In' was unsuccessful. Try again later.`);
    }

    return (
        <Container
            component='main'
            maxWidth='xs'
        >
            <Paper
                className={classes.paper}
                elevation={3}
            >
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>
                    {
                        isSignUp ? 'Sign Up' :  'Sing In'
                    }
                </Typography>
                <form 
                    className={classes.form}
                    onSubmit={handleSubmit}
                >
                    <Grid
                        container
                        spacing={2}
                    >
                        {
                            isSignUp && (
                                <>
                                    <Input
                                        name='firstName'
                                        label='First Name'
                                        handleChange={handleChange}
                                        autoFocus
                                        half
                                    />
                                    <Input
                                        name='lastName'
                                        label='Last Name'
                                        handleChange={handleChange}
                                        half
                                    />
                                </>
                            )
                        }
                        <Input
                            name='email'
                            type='email'
                            label='Email Address'
                            handleChange={handleChange}
                        />
                         <Input
                            name='password'
                            type={showPassword ? 'text' : 'password'}
                            label='Password'
                            handleChange={handleChange}
                            handleShowPassword={handleShowPassword}
                        />
                        {
                            isSignUp && (
                                <Input 
                                    name='confirmPassword'
                                    type={showPassword ? 'text' : 'password'}
                                    label='Confirm Password'
                                    handleChange={handleChange}
                                />
                            )
                        }
                    </Grid>
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                    >
                        {
                            isSignUp ? 'Sign Up' :  'Sing In'
                        }
                    </Button>
                    <GoogleLogin 
                        className={classes.googleButton}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                    />
                    <Grid
                        container
                        justifyContent='flex-end'
                    >
                        <Grid item>
                            <Button onClick={switchAuthMode} >
                                {
                                    isSignUp ? 'Already have an account? Sign In' 
                                    :  `Don't have an account? Sing Up`
                                }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth