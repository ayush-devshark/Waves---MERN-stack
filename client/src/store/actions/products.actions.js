import axios from 'axios';
import * as actions from '.';

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
