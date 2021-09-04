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

import Dashboard from 'components/dashboard';

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
                                path='/dashboard'
                                component={AuthGuard(Dashboard)}
                            />
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
