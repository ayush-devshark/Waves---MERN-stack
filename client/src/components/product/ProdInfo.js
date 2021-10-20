import React from 'react';
import { WavesButton } from 'utils/tools';

import LocalShipingIcon from '@material-ui/icons/LocalShipping';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutline';
// import SentimentalVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

// import { useDispatch, useSelector } from 'react-redux';

const ProdInfo = props => {
    const detail = props.detail;
    console.log({ detail });
    // const dispatch = useDispatch();

    const showProdTags = detail => (
        <div className='product_tags'>
            <div className='tag'>
                <div>{LocalShipingIcon}</div>
                <div className='tag_text'>
                    {detail.shipping ? (
                        <div>Free shipping worldwide</div>
                    ) : (
                        <div>No free shipping</div>
                    )}
                </div>
            </div>
            {detail.available > 0 ? (
                <div className='tag'>
                    <div>{DoneOutlinedIcon}</div>
                    <div className='tag_text'>
                        <div>
                            <strong>
                                {detail.available} products in warehouse
                                available.
                            </strong>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='tag'>
                    <div>{DoneOutlinedIcon}</div>
                    <div className='tag_text'>
                        <div>Sorry product not available.</div>
                    </div>
                </div>
            )}
        </div>
    );

    const showProdActions = detail => (
        <div className='product_actions'>
            <div className='price'>$ {detail.price}</div>
            <div className='cart'>
                <WavesButton type='add_to_cart_link' runAction={() => null} />
            </div>
        </div>
    );

    const showProdSpecs = detail => (
        <div className='product_specifications'>
            <h2>Specs:</h2>
            <div>
                <div className='item'>
                    <strong>Frets:</strong> {detail.frets}
                </div>
                <div className='item'>
                    <strong>Wood:</strong> {detail.woodtype}
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <h1>
                {detail.brand.name} {detail.model}
            </h1>
            <p>{detail.description}</p>
            {/* {showProdTags(detail)} */}
            {showProdActions(detail)}
            {showProdSpecs(detail)}
        </div>
    );
};

export default ProdInfo;
