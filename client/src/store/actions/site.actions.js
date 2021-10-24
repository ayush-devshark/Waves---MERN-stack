import axios from 'axios';
import * as actions from '.';
import { getAuthHeader } from '../../utils/tools';

axios.defaults.headers.post['Content-Type'] = 'application/json';

export const updateSiteVars = args => {
    return async dispatch => {
        try {
            const site = await axios.patch('/api/site', args, getAuthHeader());
            dispatch(actions.updateSiteVars(site.data));
            dispatch(actions.successGlobal('Updated!'));
        } catch (err) {
            dispatch(actions.errorGlobal(err.response.data.message));
        }
    };
};
