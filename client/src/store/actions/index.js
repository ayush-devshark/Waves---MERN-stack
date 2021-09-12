import {
    GET_PROD_BY_SOLD,
    GET_PROD_BY_DATE,
    GET_PROD_PAGINATE,
    REMOVE_PRODUCT,
    ERROR_GLOBAL,
    SUCCESS_GLOBAL,
    CLEAR_NOTIFICATIONS,
    AUTH_USER,
    SIGN_OUT,
    UPDATE_USER_PROFILE,
    USER_CHANGE_EMAIL,
} from 'store/types';

// User Action
export const userAuthenticate = user => ({
    type: AUTH_USER,
    payload: user,
});

export const userSignOut = () => ({
    type: SIGN_OUT,
});

export const userUpdateProfile = userData => ({
    type: UPDATE_USER_PROFILE,
    payload: userData,
});

export const userChangeEmail = data => ({
    type: USER_CHANGE_EMAIL,
    payload: data,
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

export const productsByPaginate = products => ({
    type: GET_PROD_PAGINATE,
    payload: products,
});

export const productRemove = () => ({
    type: REMOVE_PRODUCT,
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
