import {
    ERROR_GLOBAL,
    SUCCESS_GLOBAL,
    CLEAR_NOTIFICATIONS,
    REMOVE_PRODUCT,
} from '../types';

const notificationReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ERROR_GLOBAL:
            return { ...state, error: true, msg: payload };
        case SUCCESS_GLOBAL:
            return { ...state, success: true, msg: payload };
        case CLEAR_NOTIFICATIONS:
            return {};
        case REMOVE_PRODUCT:
            return { ...state, removeArticle: true };
        default:
            return state;
    }
};

export default notificationReducer;
