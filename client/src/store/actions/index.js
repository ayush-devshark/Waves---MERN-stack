import {
    GET_PROD_BY_SOLD,
    GET_PROD_BY_DATE,
    ERROR_GLOBAL,
    SUCCESS_GLOBAL,
    CLEAR_NOTIFICATIONS,
    AUTH_USER,
    SIGN_OUT,
} from 'store/types';

// User Action
export const userAuthenticate = user => ({
    type: AUTH_USER,
    payload: user,
});

export const userSignOut = () => ({
    type: SIGN_OUT,
});

// Products Actions
export const productsBySold = data => ({
    type: GET_PROD_BY_SOLD,
    payload: data,
});

export const productsByDate = data => ({
    type: GET_PROD_BY_DATE,
    payload: data,
});

// Notifications
export const errorGlobal = msg => ({
    type: ERROR_GLOBAL,
    payload: msg,
});
export const successGlobal = msg => ({
    type: SUCCESS_GLOBAL,
    payload: msg,
});

export const clearNotification = () => {
    return dispatch => {
        dispatch({ type: CLEAR_NOTIFICATIONS });
    };
};
