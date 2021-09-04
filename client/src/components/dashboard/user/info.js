import React from 'react';
import DashboardLayout from 'hoc/DashboardLayout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { errorHelper } from 'utils/tools';
import { useDispatch } from 'react-redux';
import { userUpdateProfile } from 'store/actions/users.actions';

import { TextField, Button } from '@material-ui/core';

const UserInfo = ({ users }) => {
    const dispatch = useDispatch();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstname: users.data.firstname,
            lastname: users.data.lastname,
        },
        validationSchema: Yup.object({
            firstname: Yup.string()
                .min(3, 'Cannot be less than 3 words')
                .max(30, 'Cannot be more than 30 chars')
                .required('This field is required'),
            lastname: Yup.string()
                .min(3, 'Cannot be less than 3 words')
                .max(30, 'Cannot be more than 30 chars')
                .required('This field is required'),
        }),
        onSubmit: values => {
            dispatch(userUpdateProfile(values));
        },
    });

    return (
        <DashboardLayout title='User Information'>
            <form
                className='mt-3 article_form'
                style={{ maxWidth: '250px' }}
                onSubmit={formik.handleSubmit}
            >
                <div className='form-group'>
                    <TextField
                        style={{ width: '100%' }}
                        name='firstname'
                        label='Enter your firstname'
                        variant='outlined'
                        {...formik.getFieldProps('firstname')}
                        {...errorHelper(formik, 'firstname')}
                    />
                </div>
                <div className='form-group'>
                    <TextField
                        style={{ width: '100%' }}
                        name='lastname'
                        label='Enter your lastname'
                        variant='outlined'
                        {...formik.getFieldProps('lastname')}
                        {...errorHelper(formik, 'lastname')}
                    />
                </div>
                <Button
                    className='mb-3'
                    variant='contained'
                    color='primary'
                    type='submit'
                >
                    Edit profile
                </Button>
            </form>
        </DashboardLayout>
    );
};

export default UserInfo;
