import React, { useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DashboardLayout from 'hoc/DashboardLayout';
import { productsByPaginate } from 'store/actions/products.actions';

const defaultValues = {
    keywords: '',
    brand: [],
    min: 0,
    max: 5000,
    frets: [],
    page: 1,
};

const AdminProducts = props => {
    const products = useSelector(state => state.products);
    const notifications = useSelector(state => state.notifications);
    const dispatch = useDispatch();

    const [searchValues, setSearchValues] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        defaultValues
    );

    useEffect(() => {
        dispatch(productsByPaginate(searchValues));
    }, [dispatch, searchValues]);

    return <DashboardLayout>Say Someething ....</DashboardLayout>;
};

export default AdminProducts;
