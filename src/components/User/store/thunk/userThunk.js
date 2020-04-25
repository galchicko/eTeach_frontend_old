import {userActionTypes} from '../../actions/actionTypes';
import http from '../../../../network';

export const fetchUser = (id) => (dispatch) => {
    dispatch({type: userActionTypes.FETCH_USER});

    return http.get({url: `${process.env.REACT_APP_APPS_BE}/users/${id}`})
        .then(({payload}) => {

            dispatch({
                type: userActionTypes.FETCH_USER_SUCCESS,
                payload: payload
            });
        })
        .catch(({payload}) => {
            dispatch({
                type: userActionTypes.FETCH_USER_FAILED,
                error: payload
            });
        });
};

export const fetchRegions = () => (dispatch) =>{

    return http.get({url: `${process.env.REACT_APP_APPS_BE}/regions/all`})
        .then(({payload}) => {
            dispatch({
                type: userActionTypes.FETCH_REGIONS_SUCCESS,
                payload: payload
            });
        })
        .catch(({payload}) => {
            dispatch({
                type: userActionTypes.FETCH_USER_FAILED,
                error: payload
            });
        });
};

export const editUser = () => (dispatch, getState) => {
    dispatch({type: userActionTypes.UPDATE_USER});
    const { user } = getState().userInfo;

    return http.put({url: `${process.env.REACT_APP_APPS_BE}/users/${user.id}`, body: user})
        .then(({payload}) => {
            dispatch({
                type: userActionTypes.UPDATE_USER_SUCCESS
            });
        })
        .catch(({payload}) => {
            dispatch({
                type: userActionTypes.FETCH_USER_FAILED,
                error: payload
            });
        });
};

export const createUser = () => (dispatch, getState) => {
    dispatch({type: userActionTypes.UPDATE_USER});
    const { user } = getState().userInfo;
    return http.post({url: `${process.env.REACT_APP_APPS_BE}/users`, body: user})
        .then(({payload}) => {
            dispatch({
                type: userActionTypes.UPDATE_USER_SUCCESS
            });
        })
        .catch(({payload}) => {
            dispatch({
                type: userActionTypes.FETCH_USER_FAILED,
                error: payload
            });
        });
};