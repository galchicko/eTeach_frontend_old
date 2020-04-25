const postfix = '_USER';

export const userActionTypes = {
    //fetching
    FETCH_USER: `FETCH_USER${postfix}`,
    FETCH_USER_SUCCESS: `FETCH_USER_SUCCESS${postfix}`,
    FETCH_USER_FAILED: `FETCH_USER_FAILED${postfix}`,
    FETCH_REGIONS: `FETCH_REGIONS${postfix}`,
    FETCH_REGIONS_SUCCESS: `FETCH_REGIONS_SUCCESS${postfix}`,
    FETCH_REGIONS_FAILED: `FETCH_REGIONS_FAILED${postfix}`,
    //create
    CREATE_USER: `CREATE_USER${postfix}`,
    CREATE_USER_SUCCESS: `CREATE_USER_SUCCESS${postfix}`,
    CREATE_USER_FAILED: `CREATE_USER_FAILED${postfix}`,

    //update
    UPDATE_USER: `UPDATE_USER${postfix}`,
    UPDATE_USER_SUCCESS: `UPDATE_USER_SUCCESS${postfix}`,
    UPDATE_USER_FAILED: `UPDATE_USER_FAILED${postfix}`,

    HANDLE_METADATA: `HANDLE_METADATA${postfix}`,
    RESET_STATE: `RESET_STATE${postfix}`,
    HANDLE_MODE: `HANDLE_MODE${postfix}`
};

export const resultType = {
    success: 'success',
    failed: 'failed'
};
