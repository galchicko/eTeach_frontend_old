import {eventListActionTypes} from '../actions/actionTypes';
import * as Immutable from 'seamless-immutable';

export const createInitialState = () => (
    Immutable.from({
        date: {
            from: '',
            to: ''
        },
        status: {
            Outstanding: true,
            Acknowledged: true,
            Cleared: true
        },
        search: '',
        sort: {
            sortedField: '',
            sortDirection: 'descending'
        },
        pagination: {
            resultsPerPage: 10,
            offset: 0
        }
    }));

const initialState = createInitialState();

export default function (state = initialState, action) {
    switch (action.type) {
    case eventListActionTypes.CHANGE_FILTER:
        return state.merge({
            date: action.date,
            search: action.search,
            status: action.status
        });
    case eventListActionTypes.CHANGE_PER_PAGE:
        return state.merge({
            pagination: {
                ...state.pagination,
                resultsPerPage: action.perPage
            }
        });
    case eventListActionTypes.CHANGE_CURRENT_PAGE:
        return state.merge({
            pagination: {
                ...state.pagination,
                offset: action.page * state.pagination.resultsPerPage
            }
        });
    case eventListActionTypes.CHANGE_SORTED_FIELD:
        return state.merge({
            sort: {
                ...state.sort,
                sortedField: action.sortedField,
                sortDirection: action.sortDirection
            }
        });
    case eventListActionTypes.RESET_FILTER:
        return initialState;
    default:
        return state;
    }
}

