import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Header from 'components/navigation/Header';
import Footer from 'components/navigation/Footer';
import Home from 'components/home';
import MainLayout from 'hoc/MainLayout';

function App() {
    return (
        <Router>
            <Header />
            <MainLayout>
                <Switch>
                    <Route path='/' exact component={Home} />
                </Switch>
            </MainLayout>
            <Footer />
        </Router>
    );
}

export default App;
