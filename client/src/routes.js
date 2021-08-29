import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Header from 'components/navigation/Header';
import Footer from 'components/navigation/Footer';
import Home from 'components/home';

function App() {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path='/' exact component={Home} />
            </Switch>
            <Footer />
        </Router>
    );
}

export default App;
