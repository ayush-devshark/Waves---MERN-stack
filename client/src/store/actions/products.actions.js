import axios from 'axios';
import * as actions from '.';
import {
    getAuthHeader,
    removeTokenCooke,
    getTokenCookie,
} from '../../utils/tools';

axios.defaults.headers.post['Content-Type'] = 'application/json';

export const productsBySort = ({ limit, sortBy, order, where }) => {
    return async dispatch => {
        try {
            const products = await axios.get('/api/products/all', {
                params: {
                    limit,
                    sortBy,
                    order,
                },
            });
            switch (where) {
                case 'bySold':
                    dispatch(actions.productsBySold(products.data));
                    break;
                case 'byDate':
                    dispatch(actions.productsByDate(products.data));
                    break;
                default:
                    return false;
            }
        } catch (err) {
            dispatch(actions.errorGlobal('Something went wrong. Try again!'));
            // BUG Showing notification twice
        }
    };
};

export const productsByPaginate = args => {
    return async dispatch => {
        try {
            const products = await axios.post(
                `/api/products/paginate/all`,
                args
            );
            dispatch(actions.productsByPaginate(products.data));
        } catch (err) {
            dispatch(actions.errorGlobal(err.response.data.message));
        }
    };
};

export const productRemove = id => {
    return async dispatch => {
        try {
            await axios.delete(`/api/products/product/${id}`, getAuthHeader());
            dispatch(actions.productRemove());
            dispatch(actions.successGlobal());
        } catch (err) {
            dispatch(actions.errorGlobal(err.response.data.message));
        }
    };
};

export const addProduct = data => {
    return async dispatch => {
        try {
            const product = await axios.post(
                '/api/products',
                data,
                getAuthHeader()
            );
            dispatch(actions.productAdd(product.data));
            dispatch(actions.successGlobal());
        } catch (err) {
            dispatch(actions.errorGlobal(err.response.data.message));
        }
    };
};

export const productById = id => {
    return async dispatch => {
        try {
            const product = await axios.get(`/api/products/product/${id}`);
            dispatch(actions.productById(product.data));
        } catch (err) {
            dispatch(actions.errorGlobal(err.response.data.message));
        }
    };
};
