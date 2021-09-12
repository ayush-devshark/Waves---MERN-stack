import React, { useEffect, useReducer } from 'react';
import DashboardLayout from 'hoc/DashboardLayout';
import ProductsTable from './productsTable';

import { useSelector, useDispatch } from 'react-redux';
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

    const goToEdit = id => {
        props.history.push(`/dashboard/admin/edit_products/${id}`);
    };

    const goToPage = page => {
        setSearchValues({ page: page });
    };

    useEffect(() => {
        dispatch(productsByPaginate(searchValues));
    }, [dispatch, searchValues]);

    return (
        <DashboardLayout title='Products'>
            <div className='products_table'>
                <div>Search</div>
                <hr />
                <ProductsTable
                    products={products.byPaginate}
                    prev={page => goToPage(page)}
                    next={page => goToPage(page)}
                    goToEdit={id => goToEdit(id)}
                />
            </div>
        </DashboardLayout>
    );
};

export default AdminProducts;
