import React from 'react';
import SlimPromotion from 'utils/promotions/slimBlock';
import Featured from './Featured';

const slimPromotion = {
    img: '/images/featured/featured_home_3.jpg',
    lineOne: 'Up to 40% off',
    lineTwo: 'In second hand guitars',
    linkTitle: 'Show Now',
    linkTo: '/shop',
};

const Home = () => {
    return (
        <>
            <Featured />
            <SlimPromotion items={slimPromotion} />
        </>
    );
};

export default Home;
