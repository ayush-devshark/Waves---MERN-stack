import { combineReducers } from 'redux';

import users from './users.reducer';
import products from './products.reducer';
import notifications from './notification.reducer';
import brands from './brands.reducers';

const appReducers = combineReducers({ users, products, notifications, brands });

export default appReducers;
