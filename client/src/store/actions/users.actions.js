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
