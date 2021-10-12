import {
    GET_PROD_BY_SOLD,
    GET_PROD_BY_DATE,
    GET_PROD_PAGINATE,
    GET_PROD_BY_ID,
    ADD_PRODUCT,
    CLEAR_PRODUCT_ADD,
    CLEAR_CURRENT_PRODUCT,
} from '../types';

let DEFAULT_PRODUCTS_STATE = {};

const productsReducer = (state = DEFAULT_PRODUCTS_STATE, { type, payload }) => {
    switch (type) {
        case GET_PROD_BY_SOLD:
            return { ...state, bySold: payload };
        case GET_PROD_BY_DATE:
            return { ...state, byDate: payload };
        case GET_PROD_PAGINATE:
            return { ...state, byPaginate: payload };
        case ADD_PRODUCT:
            return { ...state, lastAdded: payload };
        case CLEAR_PRODUCT_ADD:
            return { ...state, lastAdded: null };
        case GET_PROD_BY_ID:
            return { ...state, byId: payload };
        case CLEAR_CURRENT_PRODUCT:
            return { ...state, byId: null };
        default:
            return state;
    }
};

export default productsReducer;
