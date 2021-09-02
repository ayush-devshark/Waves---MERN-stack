import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { showToast } from 'utils/tools';

const MainLayout = props => {
    // useEffect(() => {
    //     showToast('SUCCESS', 'show error');
    // }, []);

    return (
        <>
            {props.children}
            <ToastContainer />
        </>
    );
};

export default MainLayout;
