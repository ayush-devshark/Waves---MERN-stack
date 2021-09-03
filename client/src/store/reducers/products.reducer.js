import { GET_PROD_BY_SOLD, GET_PROD_BY_DATE } from '../types';

let DEFAULT_PRODUCTS_STATE = {};

const productsReducer = (state = DEFAULT_PRODUCTS_STATE, { type, payload }) => {
    switch (type) {
        case GET_PROD_BY_SOLD:
            return { ...state, bySold: payload };
        case GET_PROD_BY_DATE:
            return { ...state, byDate: payload };
        default:
            return state;
    }
};

export default productsReducer;
