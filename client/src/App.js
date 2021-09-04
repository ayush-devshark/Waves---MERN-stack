import React, { useEffect, useState } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Header from 'components/navigation/Header';
import Footer from 'components/navigation/Footer';
import Home from 'components/home';
import MainLayout from 'hoc/MainLayout';
import RegisterLogin from 'components/auth';
import Loader from 'utils/loader';
import { userIsAuth } from 'store/actions/users.actions';

import { useDispatch, useSelector } from 'react-redux';

function App(props) {
    const [loading, setLoading] = useState(true);
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();

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
                    <Header />
                    <MainLayout>
                        <Switch>
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
