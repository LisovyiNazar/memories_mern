import React from 'react'
import { Link } from 'react-router-dom'
import { FcPicture } from 'react-icons/fc'
import { logout } from '../../store/actions/auth.actions'
import { useDispatch, useSelector } from 'react-redux'
import './index.scss'

const Navbar = () => {
    const dispath = useDispatch()
    const { authenticate, user } = useSelector(state => state.auth)

    return (
        <div className='navbar-container'>
            <div className='navbar-brand-container'>
                <Link to='/' className='brand-logo'>
                    <h2 className='brand-name'>
                        Memories
                    </h2>
                    <FcPicture className='brand-icon' />
                </Link>
            </div>
            <div className='navbar-info-container'>
                {
                    authenticate ? (
                        <div className='profile-container'>
                            <Link to='/profile' className='user-name'>
                                { `${user.firstName} ${user.lastName}` }
                            </Link>
                            <button 
                                type='button' 
                                className='logout-button'
                                onClick={() => dispath(logout())}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link to='/auth' className='login-button'>
                            Sign In
                        </Link>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar