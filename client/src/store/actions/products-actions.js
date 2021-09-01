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
            console.log(err);
        }
    };
};
