import {assignmentListActionTypes} from '../actions/actionTypes';
import * as Immutable from 'seamless-immutable';

export const createInitialState = () => (
    Immutable.from({
        assignments: [],
        isLoading: false,
        count: 0,
        assignmentToExpand: null
    })
);

const initialState = createInitialState();

export default function (state = initialState, action) {
    switch (action.type) {
        case assignmentListActionTypes.FETCH_ASSIGNMENT_LIST_SUCCESS:
        return {
            ...state,
            assignments: action.list,
            count: action.count,
            isLoading: action.isLoading
        };
        case assignmentListActionTypes.FETCH_ASSIGNMENT_LIST:
        return {
            ...state,
            isLoading: true
        };
        case assignmentListActionTypes.FETCH_ASSIGNMENT_LIST_FAILED:
        return {
            ...state,
            isLoading: false
        };
        case assignmentListActionTypes.EDIT_ASSIGNMENT_STATUS:
        return {
            ...state,
            isLoading: true
        };
        case assignmentListActionTypes.EDIT_ASSIGNMENT_STATUS_SUCCESS:
        return {
            ...state,
            isLoading: false
        };
        case assignmentListActionTypes.EDIT_ASSIGNMENT_STATUS_FAILED:
        return {
            ...state,
            isLoading: false
        };
        case assignmentListActionTypes.TOGGLE_ASSIGNMENT_DESC: {
            let newAssignments = [...state.assignments];
            let assignmentToChange = newAssignments.find(assignment => assignment.id === action.payload);
            assignmentToChange.expanded = !assignmentToChange.expanded;
            return {
                ...state,
                assignments: newAssignments
            };
        }
        case assignmentListActionTypes.COLLAPSE_ALL_ASSIGNMENTS_DESC: {
        return {
            ...state,
            assignments: [...state.assignments].forEach(assignment => assignment.expanded === false)
        };
    }
        case assignmentListActionTypes.EXPAND_ASSIGNMENT_FROM_ALERTS: {
        let newAssignments = [...state.assignments];
        let assignmentToChange = newAssignments.find(assignment => assignment.id === action.payload);
        if (!assignmentToChange) {
            return state;
        }
            assignmentToChange.expanded = true;
        return {
            ...state,
            assignments: newAssignments,
            assignmentToExpand: null
        };
    }
        case assignmentListActionTypes.SET_ASSIGNMENT_TO_EXPAND:
        return {
            ...state,
            assignmentToExpand: action.payload
        };
    default:
        return state;
    }
}

