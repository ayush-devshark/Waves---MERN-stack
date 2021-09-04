import { AUTH_USER, SIGN_OUT, UPDATE_USER_PROFILE } from '../types';

let DEFAULT_USER_STATE = {
    data: {
        _id: null,
        email: null,
        firstname: null,
        lastname: null,
        history: [],
        verified: null,
    },
    auth: null,
    cart: [],
};

const userReducer = (state = DEFAULT_USER_STATE, { type, payload }) => {
    switch (type) {
        case AUTH_USER:
            return {
                ...state,
                data: { ...state.data, ...payload.data },
                auth: payload.auth,
            };

        case SIGN_OUT:
            return {
                ...state,
                data: { ...DEFAULT_USER_STATE.data },
                auth: false,
            };

        case UPDATE_USER_PROFILE:
            return { ...state, data: { ...payload } };
        default:
            return state;
    }
};

export default userReducer;
