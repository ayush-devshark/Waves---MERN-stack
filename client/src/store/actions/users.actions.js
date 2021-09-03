import axios from 'axios';
import * as actions from '.';

export const userRegister = values => {
    return async dispatch => {
        try {
            const user = await axios.post('api/auth/register', {
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
