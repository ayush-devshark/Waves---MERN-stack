import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AddShoopingCartIcon from '@material-ui/icons/AddShoppingCart';
import cookie from 'react-cookies';

export const WavesButton = props => {
    let template = '';

    switch (props.type) {
        case 'default':
            template = (
                <Link
                    className={
                        !props.altClass ? 'link_default' : props.altClass
                    }
                    to={props.linkTo}
                    style={{ ...props.style }}
                >
                    {props.title}
                </Link>
            );
            break;
        case 'bag_link':
            template = (
                <div
                    className='bag_link'
                    onClick={() => props.runAction()}
                    style={{ ...props.style }}
                >
                    <AddShoopingCartIcon style={{ fontSize: props.iconSize }} />
                </div>
            );
            break;
        default:
            template = '';
    }
    return template;
};

export const renderCardImage = image => {
    if (image.length > 0) {
        return image[0];
    } else {
        return '/images/image_not_availble.png';
    }
};

export const showToast = (type, message) => {
    switch (type) {
        case 'SUCCESS':
            toast.success(message, { position: toast.POSITION.BOTTOM_RIGHT });
            break;
        case 'ERROR':
            toast.error(message, { position: toast.POSITION.BOTTOM_RIGHT });
            break;
        default:
            return false;
    }
};

export const errorHelper = (formik, value) => ({
    error: formik.errors[value] && formik.touched[value] ? true : false,
    helpersText:
        formik.errors[value] && formik.touched[value]
            ? formik.errors[value]
            : null,
});

export const getTokenCookie = () => cookie.load('x-access-token');
export const removeTokenCooke = () =>
    cookie.remove('x-access-token', { path: '/' });

export const getAuthHeader = () => {
    return { headers: { Authorization: `Bearer ${getTokenCookie()}` } };
};
