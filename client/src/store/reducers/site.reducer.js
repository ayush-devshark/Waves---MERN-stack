import { GET_SITE_VARS, UPDATE_SITE_VARS } from '../types';

const DEFAULT_SITE_STATE = {
    vars: {
        _id: '',
        address: '',
        hours: '',
        phone: '',
        email: '',
    },
};

const siteReducer = (state = DEFAULT_SITE_STATE, { type, payload }) => {
    switch (type) {
        case GET_SITE_VARS:
            return { ...state, vars: payload };
        case UPDATE_SITE_VARS:
            return { ...state, vars: payload };
        default:
            return state;
    }
};

export default siteReducer;
