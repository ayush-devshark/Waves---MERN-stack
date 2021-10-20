import axios from 'axios';
import * as actions from '.';
import {
    getAuthHeader,
    removeTokenCooke,
    getTokenCookie,
} from '../../utils/tools';

axios.defaults.headers.post['Content-Type'] = 'application/json';

export const userRegister = values => {
    return async dispatch => {
        try {
            const user = await axios.post('/api/auth/register', {
                email: values.email,
                password: values.password,
            });
            dispatch(
                actions.userAuthenticate({ data: user.data.user, auth: true })
            );
            dispatch(
                actions.successGlobal(
                    'Welcome !! check your mail to verify account.'
                )
            );
        } catch (err) {
            dispatch(actions.errorGlobal(err.response.data.message));
        }
    };
};

export const userSignin = values => {
    return async dispatch => {
        try {
            const user = await axios.post('/api/auth/signin', {
                email: values.email,
                password: values.password,
            });
            dispatch(
                actions.userAuthenticate({ data: user.data.user, auth: true })
            );
            dispatch(actions.successGlobal('Welcome Back!'));
        } catch (err) {
            dispatch(actions.errorGlobal(err.response.data.message));
        }
    };
};

export const userIsAuth = () => {
    return async dispatch => {
        try {
            if (!getTokenCookie()) {
                throw new Error();
            }
            const user = await axios.get('/api/auth/isauth', getAuthHeader());
            dispatch(actions.userAuthenticate({ data: user.data, auth: true }));
        } catch (err) {
            dispatch(actions.userAuthenticate({ data: {}, auth: false }));
        }
    };
};

export const userSignOut = () => {
    return async dispatch => {
        removeTokenCooke();
        dispatch(actions.userSignOut());
        dispatch(actions.successGlobal('Good Bye !!'));
    };
};

export const userUpdateProfile = data => {
    return async (dispatch, getState) => {
        try {
            const profile = await axios.patch(
                '/api/users/profile',
                {
                    data: data,
                },
                getAuthHeader()
            );
            const userData = {
                ...getState().users.data,
                firstname: profile.data.firstname,
                lastname: profile.data.lastname,
            };

            dispatch(actions.userUpdateProfile(userData));
            dispatch(actions.successGlobal('Profile successfully updated!'));
        } catch (err) {
            dispatch(actions.errorGlobal(err.response.data.message));
        }
    };
};

export const userChangeEmail = data => {
    return async dispatch => {
        try {
            await axios.patch(
                '/api/users/email',
                {
                    email: data.email,
                    newemail: data.newemail,
                },
                getAuthHeader()
            );
            dispatch(actions.userChangeEmail(data.newemail));
            dispatch(
                actions.successGlobal(
                    'Email updated, Remeber to verify your account'
                )
            );
        } catch (err) {
            dispatch(actions.errorGlobal(err.response.data.message));
        }
    };
};

export const userAddToCart = item => {
    return (dispatch, getState) => {
        try {
            const cart = getState().users.cart;
            dispatch(actions.userAddToCart([...cart, item]));
            dispatch(actions.successGlobal(`${item.model} added to cart :)`));
        } catch (err) {
            dispatch(actions.errorGlobal(err.response.data.message));
        }
    };
};
