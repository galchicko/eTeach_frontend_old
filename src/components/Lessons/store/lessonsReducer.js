import {lessonListActionTypes} from '../actions/actionTypes';
import * as Immutable from 'seamless-immutable';

export const createInitialState = () => (
    Immutable.from({
        lessons: [],
        isLoading: false,
        count: 0,
        lessonToExpand: null
    })
);

const initialState = createInitialState();

export default function (state = initialState, action) {
    switch (action.type) {
        case lessonListActionTypes.FETCH_LESSON_LIST_SUCCESS:
        return {
            ...state,
            lessons: action.list,
            count: action.count,
            isLoading: action.isLoading
        };
        case lessonListActionTypes.FETCH_LESSON_LIST:
        return {
            ...state,
            isLoading: true
        };
        case lessonListActionTypes.FETCH_LESSON_LIST_FAILED:
        return {
            ...state,
            isLoading: false
        };
        case lessonListActionTypes.EDIT_LESSON_STATUS:
        return {
            ...state,
            isLoading: true
        };
        case lessonListActionTypes.EDIT_LESSON_STATUS_SUCCESS:
        return {
            ...state,
            isLoading: false
        };
        case lessonListActionTypes.EDIT_LESSON_STATUS_FAILED:
        return {
            ...state,
            isLoading: false
        };
        case lessonListActionTypes.TOGGLE_LESSON_DESC: {
            let newLessons = [...state.lessons];
            let lessonToChange = newLessons.find(lesson => lesson.id === action.payload);
            lessonToChange.expanded = !lessonToChange.expanded;
            return {
                ...state,
                lessons: newLessons
            };
        }
        case lessonListActionTypes.COLLAPSE_ALL_ASSIGNMENTS_DESC: {
        return {
            ...state,
            lessons: [...state.lessons].forEach(lesson => lesson.expanded === false)
        };
    }
        case lessonListActionTypes.EXPAND_LESSON_FROM_ALERTS: {
        let newLessons = [...state.lessons];
        let lessonToChange = newLessons.find(lesson => lesson.id === action.payload);
        if (!lessonToChange) {
            return state;
        }
            lessonToChange.expanded = true;
        return {
            ...state,
            lessons: newLessons,
            lessonToExpand: null
        };
    }
        case lessonListActionTypes.SET_LESSON_TO_EXPAND:
        return {
            ...state,
            lessonToExpand: action.payload
        };
    default:
        return state;
    }
}

