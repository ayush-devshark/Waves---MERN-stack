import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { errorhelper } from 'utils/tools';
import Loader from 'utils/loader';

import { useSelector, useDispatch } from 'react-redux';
import { userRegister } from 'store/actions/users.actions';

import { TextField, Button } from '@material-ui/core';

const AuthForm = props => {
    const [loading, setLoading] = useState(false);

    const notifications = useSelector(state => state.notifications);
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: 'test@email.com',
            password: 'testing1234',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Sorry the email is required')
                .email('This is an invlaid email'),
            password: Yup.string().required('The password is required'),
        }),
        onSubmit: values => {
            setLoading(true);
            handleSubmit(values);
        },
    });

    const handleSubmit = values => {
        if (props.formType) {
            dispatch(userRegister(values));
        } else {
            // sign_in
        }
    };

    useEffect(() => {
        if (notifications && notifications.success) {
            props.history.push('/dashboard');
        } else {
            setLoading(false);
        }
    }, [notifications, props.history]);

    return (
        <>
            <div className='auth_container'>
                {loading ? (
                    <Loader />
                ) : (
                    <form className='mt-3' onSubmit={formik.handleSubmit}>
                        <div className='form-group'>
                            <TextField
                                style={{ width: '100%' }}
                                name='email'
                                label='Enter your email'
                                variant='outlined'
                                {...formik.getFieldProps('email')}
                                {...errorhelper(formik, 'email')}
                            />
                        </div>
                        <div className='form-group'>
                            <TextField
                                style={{ width: '100%' }}
                                name='password'
                                label='Enter your password'
                                variant='outlined'
                                type='password'
                                {...formik.getFieldProps('password')}
                                {...errorhelper(formik, 'password')}
                            />
                        </div>
                        <Button
                            variant='contained'
                            color='primary'
                            type='submit'
                            size='small'
                        >
                            {props.formType ? 'Register' : 'Login'}
                        </Button>
                    </form>
                )}
            </div>
        </>
    );
};

export default AuthForm;
