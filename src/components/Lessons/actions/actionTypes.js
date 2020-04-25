const postfix = '_LESSON_LIST';

export const lessonListActionTypes = {
    //fetching
    FETCH_LESSON_LIST: `FETCH_LESSON_LIST${postfix}`,
    FETCH_LESSON_LIST_SUCCESS: `FETCH_LESSON_LIST_SUCCESS${postfix}`,
    FETCH_LESSON_LIST_FAILED: `FETCH_LESSON_LIST_FAILED${postfix}`,
    CHANGE_PER_PAGE: `CHANGE_PER_PAGE${postfix}`,
    CHANGE_CURRENT_PAGE: `CHANGE_CURRENT_PAGE${postfix}`,
    CHANGE_SORTED_FIELD: `CHANGE_SORTED_FIELD${postfix}`,
    CHANGE_FILTER: `CHANGE_FILTER${postfix}`,
    EDIT_LESSON_STATUS: `EDIT_LESSON_STATUS${postfix}`,
    EDIT_LESSON_STATUS_SUCCESS: `EDIT_LESSON_STATUS_SUCCESS${postfix}`,
    EDIT_LESSON_STATUS_FAILED: `EDIT_LESSON_STATUS_FAILED${postfix}`,
    TOGGLE_LESSON_DESC: `TOGGLE_LESSON_DESC${postfix}`,
    COLLAPSE_ALL_LESSONS_DESC: `COLLAPSE_ALL_LESSONS_DESC${postfix}`,
    SET_LESSON_TO_EXPAND: `SET_LESSON_TO_EXPAND${postfix}`,
    EXPAND_LESSON_FROM_ALERTS: `EXPAND_LESSON_FROM_ALERTS${postfix}`,
    RESET_FILTER: `RESET_FILTER${postfix}`
};