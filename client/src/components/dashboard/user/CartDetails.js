import React from 'react';
import { renderCartImage } from 'utils/tools';

const CartDetails = ({ products, removeItem }) => {
    const renderItems = () =>
        products
            ? products.map((product, idx) => (
                  <div className='user_product_block' key={product._id}>
                      <div className='item'>
                          <div
                              className='image'
                              style={{
                                  background: `url(${renderCartImage(
                                      product.images
                                  )}) no-repeat`,
                              }}
                          ></div>
                      </div>
                      <div className='item'>
                          <h4>Product name</h4>
                          <div>
                              {product.brand.name} {product.model}
                          </div>
                      </div>
                      <div className='item'>
                          <h4>Price</h4>
                          <div>$ {product.price}</div>
                      </div>
                      <div className='item btn'>
                          <div
                              className='cart_remove_btn'
                              onClick={() => removeItem(idx)}
                          >
                              Remove
                          </div>
                      </div>
                  </div>
              ))
            : null;

    return <div>{renderItems()}</div>;
};

export default CartDetails;
