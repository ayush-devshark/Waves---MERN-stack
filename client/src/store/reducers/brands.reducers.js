import { GET_ALL_BRANDS } from 'store/types';

const brandsReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case GET_ALL_BRANDS:
            return { ...state, all: payload };
        default:
            return state;
    }
};

export default brandsReducer;
