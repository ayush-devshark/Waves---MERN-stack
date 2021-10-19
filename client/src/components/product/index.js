import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { productById } from 'store/actions/products.actions';
import { clearCurrentProduct } from 'store/actions/index';

import Loader from 'utils/loader';
import { renderCartImage } from 'utils/tools';

import ProdInfo from './ProdInfo';

const ProductDetail = props => {
    const products = useSelector(state => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productById(props.match.params.id));
    }, [dispatch, props.match.params.id]);

    useEffect(() => {
        return () => {
            dispatch(clearCurrentProduct());
        };
    }, [dispatch]);

    return (
        <div className='page_container'>
            <div className='page_top'>
                <div className='container'>Product Detail</div>
            </div>
            <div className='container'>
                {products && products.byId ? (
                    <div className='product_detail_wrapper'>
                        <div className='left'>
                            <div>
                                <img
                                    src={renderCartImage(products.byId.images)}
                                    alt='some'
                                    onClick={() => null}
                                />
                            </div>
                        </div>
                        <div className='right'>
                            <ProdInfo detail={products.byId} />
                        </div>
                    </div>
                ) : (
                    <Loader />
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
