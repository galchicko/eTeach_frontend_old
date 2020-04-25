import {eventListActionTypes} from '../actions/actionTypes';
import * as Immutable from 'seamless-immutable';

export const createInitialState = () => (
    Immutable.from({
        events: [],
        isLoading: false,
        count: 0,
        eventToExpand: null
    })
);

const initialState = createInitialState();

export default function (state = initialState, action) {
    switch (action.type) {
    case eventListActionTypes.FETCH_EVENT_LIST_SUCCESS:
        return {
            ...state,
            events: action.list,
            count: action.count,
            isLoading: action.isLoading
        };
    case eventListActionTypes.FETCH_EVENT_LIST:

        return {
            ...state,
            isLoading: true
        };
    case eventListActionTypes.FETCH_EVENT_LIST_FAILED:
        return {
            ...state,
            isLoading: false
        };
    case eventListActionTypes.EDIT_EVENT_STATUS:
        return {
            ...state,
            isLoading: true
        };
    case eventListActionTypes.EDIT_EVENT_STATUS_SUCCESS:
        return {
            ...state,
            isLoading: false
        };
    case eventListActionTypes.EDIT_EVENT_STATUS_FAILED:
        return {
            ...state,
            isLoading: false
        };
    case eventListActionTypes.TOGGLE_EVENT_DESC: {
        let newEvents = [...state.events];
        let eventToChange = newEvents.find(event => event.id === action.payload);
        eventToChange.expanded = !eventToChange.expanded;
        return {
            ...state,
            events: newEvents
        };
    }
    case eventListActionTypes.COLLAPSE_ALL_EVENTS_DESC: {
        return {
            ...state,
            events: [...state.events].forEach(event => event.expanded === false)
        };
    }
    case eventListActionTypes.EXPAND_EVENT_FROM_ALERTS: {
        let newEvents = [...state.events];
        let eventToChange = newEvents.find(event => event.id === action.payload);
        if (!eventToChange) {
            return state;
        }
        eventToChange.expanded = true;
        return {
            ...state,
            events: newEvents,
            eventToExpand: null
        };
    }
    case eventListActionTypes.SET_EVENT_TO_EXPAND:
        return {
            ...state,
            eventToExpand: action.payload
        };
    default:
        return state;
    }
}

