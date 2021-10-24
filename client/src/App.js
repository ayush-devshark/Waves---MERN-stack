import React, { useEffect, useState } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import MainLayout from 'hoc/MainLayout';
import Loader from 'utils/loader';
import AuthGuard from './hoc/authGuard';

import { userIsAuth, userSignOut } from 'store/actions/users.actions';
import { useDispatch, useSelector } from 'react-redux';

import Header from 'components/navigation/Header';
import Footer from 'components/navigation/Footer';
import Home from 'components/home';
import RegisterLogin from 'components/auth';
import Shop from 'components/shop';

import Dashboard from 'components/dashboard';
import UserInfo from 'components/dashboard/user/info';
import AdminProducts from 'components/dashboard/admin/products';
import AddProduct from 'components/dashboard/admin/products/addedit/add';
import EditProduct from 'components/dashboard/admin/products/addedit/edit';
import ProductDetail from 'components/product';
import UserCart from 'components/dashboard/user/cart';
import ManageSite from 'components/dashboard/admin/site';

function App(props) {
    const [loading, setLoading] = useState(true);
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();

    const signoutUser = () => {
        dispatch(userSignOut());
    };

    useEffect(() => {
        dispatch(userIsAuth());
    }, [dispatch]);

    useEffect(() => {
        if (users.auth !== null) {
            setLoading(false);
        }
    }, [users]);

    return (
        <Router>
            {loading ? (
                <Loader full={true} />
            ) : (
                <>
                    <Header users={users} signoutUser={signoutUser} />
                    <MainLayout>
                        <Switch>
                            <Route
                                path='/dashboard/admin/edit_products/:id'
                                component={AuthGuard(EditProduct)}
                            />
                            <Route
                                path='/dashboard/admin/add_products'
                                component={AuthGuard(AddProduct)}
                            />
                            <Route
                                path='/dashboard/admin/admin_products'
                                component={AuthGuard(AdminProducts)}
                            />
                            <Route
                                path='/dashboard/admin/manage_site'
                                component={AuthGuard(ManageSite)}
                            />
                            <Route
                                path='/dashboard/user/user_cart'
                                component={AuthGuard(UserCart)}
                            />
                            <Route
                                path='/dashboard/user/user_info'
                                component={AuthGuard(UserInfo)}
                            />
                            <Route
                                path='/dashboard'
                                component={AuthGuard(Dashboard)}
                            />
                            <Route
                                path='/product_detail/:id'
                                component={ProductDetail}
                            />
                            <Route path='/shop' component={Shop} />
                            <Route path='/sign_in' component={RegisterLogin} />
                            <Route path='/' exact component={Home} />
                        </Switch>
                    </MainLayout>
                    <Footer />
                </>
            )}
        </Router>
    );
}

export default App;
