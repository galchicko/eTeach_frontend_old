import {centralComponentTypes} from './CentralComponentActionTypes';
import {centralTabsTypes} from './CentralTabsActionTypes';
import * as Immutable from 'seamless-immutable';
import {ALL_ACTIVE_CENTRAL_TABS, CENTRAL_TABS} from '../consts';

export const createInitialState = () => (
    Immutable.from({
        inProgress: false,
        tabs: ALL_ACTIVE_CENTRAL_TABS,
        activeTab: CENTRAL_TABS.INFORMATION
    })
);

const initialState = createInitialState();

export default function (state = initialState, action) {
    switch (action.type) {

    case centralTabsTypes.SET_ACTIVE_TAB:
        return state.merge({activeTab: action.payload});

    case centralTabsTypes.SET_AVAILABLE_TABS:
        return state.merge({tabs: action.payload});

    case centralComponentTypes.SET_IN_PROGRESS:
        return state.merge({inProgress: action.payload});

    case centralComponentTypes.CLEAR_ALL:
        return initialState;

    default:
        return state;
    }
}
