import React, { useEffect, useState } from 'react';
import ProdInfo from './ProdInfo';

import { useDispatch, useSelector } from 'react-redux';
import { productById } from 'store/actions/products.actions';
import { clearCurrentProduct } from 'store/actions/index';

import Loader from 'utils/loader';
import { renderCartImage } from 'utils/tools';

import { Modal } from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductDetail = props => {
    const [modal, setModal] = useState(false);
    const products = useSelector(state => state.products);
    const dispatch = useDispatch();

    const sliderSettings = {
        dot: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const handleModalClose = () => {
        setModal(false);
    };

    const handleCarrousel = () => {
        if (products.byId.images.length > 0) {
            setModal(true);
        }
    };

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
                                    onClick={() => handleCarrousel()}
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
            <Modal
                show={modal}
                onHide={handleModalClose}
                dialogClassName='modal-90w'
            >
                <Modal.Header closeButton>
                    <Modal.Body>
                        <Slider {...sliderSettings}>
                            {products.byId && products.byId.images
                                ? products.byId.images.map(item => (
                                      <div
                                          key={item}
                                          style={{ margin: '0 auto' }}
                                      >
                                          <div
                                              className='img-block'
                                              style={{
                                                  background: `url(${item}) no-repeat`,
                                              }}
                                          ></div>
                                      </div>
                                  ))
                                : null}
                        </Slider>
                    </Modal.Body>
                </Modal.Header>
            </Modal>
        </div>
    );
};

export default ProductDetail;
