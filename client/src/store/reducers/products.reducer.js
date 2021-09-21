import {
    GET_PROD_BY_SOLD,
    GET_PROD_BY_DATE,
    GET_PROD_PAGINATE,
    ADD_PRODUCT,
    CLEAR_PRODUCT_ADD,
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
        default:
            return state;
    }
};

export default productsReducer;
