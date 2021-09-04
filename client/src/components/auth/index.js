import React, { useState } from 'react';
import AuthForm from './AuthForm';
import { Button } from '@material-ui/core';
import PreventSignInRoute from 'hoc/PreventSignInRoute';

const RegisterLogin = props => {
    const [formType, setFormType] = useState(false);

    const toggleFormType = () => {
        setFormType(!formType);
    };

    return (
        <PreventSignInRoute>
            <div className='page_wrapper'>
                <div className='container'>
                    <div className='register_login_container'>
                        <div className='left'>
                            {formType ? (
                                <>
                                    <h1>New Customers</h1>
                                    <p>
                                        Lorem, ipsum dolor sit amet consectetur
                                        adipisicing elit. Voluptates sunt
                                        voluptas ratione alias expedita facere
                                        laborum, perferendis adipisci illo
                                        provident soluta. Voluptatibus.
                                    </p>
                                </>
                            ) : (
                                <>
                                    <h1>Welcome Back</h1>
                                    <p>
                                        Lorem, ipsum dolor sit amet consectetur
                                        adipisicing elit. Fugiat sequi non,
                                        asperiores ratione molestiae saepe
                                        soluta quis cum, odio praesentium
                                        inventore repudiandae, tempora esse!
                                        Commodi totam quibusdam deleniti
                                        temporibus est
                                    </p>
                                </>
                            )}

                            <Button
                                variant='contained'
                                color='default'
                                size='small'
                                onClick={() => toggleFormType()}
                            >
                                {formType
                                    ? 'Already registered ?'
                                    : 'Need to register'}
                            </Button>
                        </div>
                        <div className='right'>
                            <h2>{formType ? 'Register' : 'Sign in'}</h2>
                            <AuthForm formType={formType} {...props} />
                        </div>
                    </div>
                </div>
            </div>
        </PreventSignInRoute>
    );
};

export default RegisterLogin;
