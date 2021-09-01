import React, { useEffect } from 'react';
import SlimPromotion from 'utils/promotions/slimBlock';
import Featured from './Featured';
import { useDispatch } from 'react-redux';
import { productsBySort } from 'store/actions/products-actions';

const slimPromotion = {
    img: '/images/featured/featured_home_3.jpg',
    lineOne: 'Up to 40% off',
    lineTwo: 'In second hand guitars',
    linkTitle: 'Show Now',
    linkTo: '/shop',
};

const Home = () => {
    const dispatch = useDispatch();

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
            <SlimPromotion items={slimPromotion} />
        </>
    );
};

export default Home;
