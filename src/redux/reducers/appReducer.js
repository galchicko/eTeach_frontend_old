import * as Immutable from 'seamless-immutable';
import {appActionNames} from '../../consts';

const initialState = Immutable.from({
    inProgress: true,
    currentUser: null
});

export const appReducer = (state = initialState, {type, payload}) => {
    switch (type) {

    case appActionNames.FETCH_CURRENT_USER_SUCCESS:
        return state.merge({ currentUser: payload});

    case appActionNames.FETCH_CURRENT_USER_FAILED:
        return state.merge({ currentUser: {error: '401 Unauthorized'}});

    default:
        return state;
    }
};