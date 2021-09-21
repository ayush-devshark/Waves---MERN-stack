import axios from 'axios';
import * as actions from '.';

export const getAllBrands = () => {
    return async dispatch => {
        try {
            const brands = await axios.get('/api/brands/all');
            dispatch(actions.getAllBrands(brands.data));
        } catch (err) {
            dispatch(actions.errorGlobal(err.response.data.message));
        }
    };
};
