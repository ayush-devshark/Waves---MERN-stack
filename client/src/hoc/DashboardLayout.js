import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const userlinks = [
    {
        name: 'My account',
        linkTo: '/dashboard',
    },
    {
        name: 'User information',
        linkTo: '/dashboard/user/user_info',
    },
    {
        name: 'My cart',
        linkTo: '/dashboard/user/user_cart',
    },
];

export const adminLinks = [
    {
        name: 'Products',
        linkTo: '/dashboard/admin/admin_products',
    },
    {
        name: 'Manage site',
        linkTo: '/dashboard/admin/manage_site',
    },
];

const DashboardLayout = props => {
    const users = useSelector(state => state.users);

    const generateLinks = links =>
        links.map(item => (
            <Link key={item.name} to={item.linkTo}>
                {item.name}
            </Link>
        ));

    return (
        <div className='container'>
            <div className='user_container page_container'>
                <div className='user_left_nav'>
                    <h2>My account</h2>
                    <div className='links'>{generateLinks(userlinks)}</div>
                    {users.data.role === 'admin' ? (
                        <div>
                            <h2>Admin</h2>
                            <div className='links'>
                                {generateLinks(adminLinks)}
                            </div>
                        </div>
                    ) : null}
                </div>
                <div className='user_right'>
                    <div className='dashboard_title'>
                        <h1>{props.title}</h1>
                    </div>
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
