import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = ({ users, signoutUser }) => {
    return (
        <header className='bck_b_light'>
            <div className='container'>
                <div className='left'>
                    <div className='logo'>WAVES</div>
                </div>
                <div className='right'>
                    <div className='top'>
                        {users.auth ? (
                            <>
                                <div className='cart_link'>
                                    <span>0</span>
                                    <Link to='/dashboard/user/user_cart'>
                                        My Cart
                                    </Link>
                                </div>
                                <Link to='/dashboard'>My Account</Link>
                                <span
                                    onClick={() => {
                                        signoutUser();
                                    }}
                                >
                                    Logout
                                </span>
                            </>
                        ) : (
                            <Link to='/sign_in'>Login</Link>
                        )}
                    </div>
                    <div className='bottom'>
                        <Link to='/'>Home</Link>
                        <Link to='/shop'>Shop</Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
