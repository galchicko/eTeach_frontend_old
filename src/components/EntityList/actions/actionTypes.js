const postfix = '_ENTITY_LIST';

export const entityListActionNames = {
    SELECT_ENTITY: `SELECT_ENTITY${postfix}`,
    COLLAPSE_ALL: `COLLAPSE_ALL${postfix}`,
    EXPAND_ENTITY: `EXPAND_ENTITY${postfix}`,
    TOGGLE_CLICK_ENTITY_LIST: `TOGGLE_CLICK_${postfix}`,
    CLEAR_ENTITY_LIST: `CLEAR_ENTITY_LIST${postfix}`,

    //WebSocket Event
    CHANGE_ENTITY_INFO_IN_LIST: `CHANGE_ENTITY_INFO_IN_LIST${postfix}`,
    ON_ENTITY_ADD: `ON_ENTITY_ADD${postfix}`,
    ON_ENTITY_REMOVE: `ON_ENTITY_REMOVE${postfix}`,

    //fetching
    FETCH_ENTITY_LIST: `FETCH_ENTITY_LIST${postfix}`,
    FETCH_ENTITY_LIST_SUCCESS: `FETCH_ENTITY_LIST_SUCCESS${postfix}`,
    FETCH_ENTITY_LIST_FAILED: `FETCH_ENTITY_LIST_FAILED${postfix}`
};