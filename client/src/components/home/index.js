import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsBySort } from 'store/actions/products-actions';
import Featured from './Featured';
import CardBlock from 'utils/products/cardblocks';
import SlimPromotion from 'utils/promotions/slimBlock';
import Loader from 'utils/loader';

const slimPromotion = {
    img: '/images/featured/featured_home_3.jpg',
    lineOne: 'Up to 40% off',
    lineTwo: 'In second hand guitars',
    linkTitle: 'Show Now',
    linkTo: '/shop',
};

const Home = () => {
    const dispatch = useDispatch();
    const { bySold, byDate } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(
            productsBySort({
                limit: 4,
                sortBy: 'itemSold ',
                order: 'desc',
                where: 'bySold',
            })
        );
        dispatch(
            productsBySort({
                limit: 4,
                sortBy: 'date',
                order: 'desc',
                where: 'byDate',
            })
        );
    }, [dispatch]);

    return (
        <>
            <Featured />
            {bySold ? (
                <CardBlock items={bySold} title='Best Selling Guitars' />
            ) : (
                <Loader />
            )}
            <SlimPromotion items={slimPromotion} />
            {byDate ? (
                <CardBlock items={byDate} title='Latest guitars on the shop' />
            ) : (
                <Loader />
            )}
        </>
    );
};

export default Home;
