import {loginActionNames} from './loginActionTypes';
import http from '../../../network';

export const sendCredentials = (username, password) => (dispatch) => {
    dispatch({type: loginActionNames.SEND_CREDENTIALS});

    http.post({url: `${process.env.REACT_APP_APPS_BE}/login`, body:{username, password}})
        .then(() => {
            dispatch({type: loginActionNames.SEND_CREDENTIALS_SUCCESS});
            window.location.assign('/');
        })
        .catch((error) => {
            dispatch({type: loginActionNames.SEND_CREDENTIALS_FAILED, payload: error.payload && error.payload.data});
            console.error('Failed Login');
            console.error(error);
        });

};