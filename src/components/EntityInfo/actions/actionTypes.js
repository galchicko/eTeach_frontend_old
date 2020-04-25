const postfix = '_ENTITY_INFO_TAB';

export const entityInfoTabActionNames = {
    EDIT_ENTITY_CLEAR: `EDIT_ENTITY_CLEAR${postfix}`,

    SET_ENTITY_DATA: `SET_ENTITY_DATA${postfix}`,

    FETCH_ENTITY: `FETCH_ENTITY${postfix}`,
    FETCH_ENTITY_SUCCESS: `FETCH_ENTITY_SUCCESS${postfix}`,
    FETCH_ENTITY_FAILED: `FETCH_ENTITY_FAILURE${postfix}`,

    UPDATE_ENTITY: `UPDATE_ENTITY${postfix}`,
    UPDATE_ENTITY_SUCCESS: `UPDATE_ENTITY_SUCCESS${postfix}`,
    UPDATE_ENTITY_FAILED: `UPDATE_ENTITY_FAILED${postfix}`,

    RELOAD_ENTITY_INFO: `RELOAD_ENTITY_INFO${postfix}`,
    RELOAD_ENTITY_INFO_SUCCESS: `RELOAD_ENTITY_INFO_SUCCESS${postfix}`,
    RELOAD_ENTITY_INFO_FAILED: `RELOAD_ENTITY_INFO_FAILED${postfix}`,

    RESET_ENTITY: `RESET_ENTITY${postfix}`,
    RESET_ENTITY_SUCCESS: `RESET_ENTITY_SUCCESS${postfix}`,
    RESET_ENTITY_FAILED: `RESET_ENTITY_FAILED${postfix}`
};