import * as Immutable from 'seamless-immutable';
import {loginActionNames} from './loginActionTypes';

const initialState = Immutable.from({
    inProgress: false,
    isLogged: false,
    error: null,
    errorCount: 0
});

export default function (state = initialState, {type, payload}) {
    switch (type) {
    case loginActionNames.SEND_CREDENTIALS:
        return state.merge({inProgress: true, error: null});

    case loginActionNames.SEND_CREDENTIALS_SUCCESS:
        return state.merge({error: null, inProgress: false, errorCount:0});

    case loginActionNames.SEND_CREDENTIALS_FAILED:
        return state.merge({error: payload || 'login.serverError', isLogged: true, inProgress: false, errorCount: state.errorCount + 1});

    default:
        return state;
    }
};