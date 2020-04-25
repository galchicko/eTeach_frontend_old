import {appActionNames} from '../../consts';
import http from '../../network';
import {pushHistoryRouteByEntity, pushHistoryRoute} from '../../services/historyService';

export const fetchCurrentUser = () => (dispatch) => {
    dispatch({ type: appActionNames.FETCH_CURRENT_USER });

    return http.get({ url: `${process.env.REACT_APP_APPS_BE}/users/current`})
        .then(({ payload }) => {
            if (window.location.pathname === '/login') {
                pushHistoryRoute('/');
            }
            dispatch({
                type: appActionNames.FETCH_CURRENT_USER_SUCCESS,
                payload
            });
        })
        .catch(({ payload }) => {
            pushHistoryRoute('/login');
            dispatch({
                type: appActionNames.FETCH_CURRENT_USER_FAILED
            });
        });
};

export const logoutUser = (isSilentLogout) => (dispatch) => {
    dispatch({ type: appActionNames.LOGOUT_CURRENT_USER });

    return http.post({ url: `${process.env.REACT_APP_APPS_BE}/logout`})
        .then(({ payload }) => {
            !isSilentLogout && window.location.assign('/login');
            dispatch({
                type: appActionNames.LOGOUT_CURRENT_USER_SUCCESS,
                payload
            });
        })
        .catch(({ payload }) => {
            dispatch({
                type: appActionNames.LOGOUT_CURRENT_USER_FAILED
            });
        });
};



export const pushHistoryRouteBySelectedEntity = (selectedEntity) => (dispatch, getState) => {
    pushHistoryRouteByEntity(selectedEntity);
};