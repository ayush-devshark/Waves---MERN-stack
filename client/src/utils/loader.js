import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = ({ full }) => {
    return (
        <div className={`root_loader ${full ? 'full' : ''}`}>
            <CircularProgress />
        </div>
    );
};

export default Loader;
