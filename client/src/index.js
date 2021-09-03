import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import 'resources/styles/styles.css';

import { Provider } from 'react-redux';
import ReduxStore from './store';

ReactDOM.render(
    <Provider store={ReduxStore()}>
        <App />
    </Provider>,
    document.getElementById('root')
);
