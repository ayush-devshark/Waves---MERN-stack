import React, { useState, useEffect } from 'react';
import DashboardLayout from 'hoc/DashboardLayout';
import Loader from 'utils/loader';
import CartDetails from './CartDetails';

import { useDispatch, useSelector } from 'react-redux';
import { userRemoveFromCart } from 'store/actions/users.actions';

import { PayPalButton } from 'react-paypal-button-v2';

const UserCart = props => {
    const [loading, setLoading] = useState(false);
    const notifications = useSelector(state => state.notifications);
    const dispatch = useDispatch();

    const removeItem = position => {
        dispatch(userRemoveFromCart(position));
    };

    const calculateTotal = () => {
        let total = 0;
        props.users.cart.forEach(item => (total += parseInt(item.price, 10)));
        return total;
    };

    const generateUnits = () => {
        return [
            {
                description: 'Guitars and accessories',
                amount: {
                    currency_code: 'USD',
                    value: calculateTotal(),
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: calculateTotal(),
                        },
                    },
                },
                items: generateItems(),
            },
        ];
    };

    const generateItems = () => {
        let items = props.users.cart.map(item => ({
            unit_amount: { currency_code: 'USD', value: item.price },
            quantity: 1,
            name: item.model,
        }));
        return items;
    };

    return (
        <DashboardLayout title='Your Cart'>
            {props.users.cart && props.users.cart.length > 0 ? (
                <>
                    <CartDetails
                        products={props.users.cart}
                        removeItem={position => removeItem(position)}
                    />
                    <div
                        className='user_cart_sum'
                        style={{ marginBottom: '10px' }}
                    >
                        <div>Total amount: ${calculateTotal()}</div>
                    </div>
                    {loading ? (
                        <Loader />
                    ) : (
                        <div>
                            <PayPalButton
                                options={{
                                    clientId:
                                        'AYzMxe-1qLeatJAHRCaNGozv2T0X6cBlAIVsqMSRFZ9ouh05KWRnGSDG7Z3MdF-zzJF8RQnKRRHLGUcg',
                                    currency: 'USD',
                                    disableFunding: 'credit,card',
                                }}
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: generateUnits(),
                                    });
                                }}
                                onSuccess={(details, data) => {
                                    console.log({ details, data });
                                    setLoading(true);
                                }}
                                onCancel={data => {
                                    setLoading(false);
                                }}
                            />
                        </div>
                    )}
                </>
            ) : (
                <div>There is nothing in your cart</div>
            )}
        </DashboardLayout>
    );
};

export default UserCart;
