import {
    GET_PROD_BY_SOLD,
    GET_PROD_BY_DATE,
    GET_PROD_PAGINATE,
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
        default:
            return state;
    }
};

export default productsReducer;
