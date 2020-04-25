import {entityInfoActionNames} from '../../../../consts/entityActionTypes';
import {entityInfoTabActionNames} from '../../actions/actionTypes';

import http from '../../../../network';


export const endpoint = `${process.env.REACT_APP_APPS_BE}/schools`;

export const fetchSchool = (schoolId) => (dispatch, getState) => {
    dispatch({type: entityInfoActionNames.FETCH_ENTITY_INFO});

    return http.get({
        url: `${endpoint}/${schoolId}`
    })
        .then(({payload}) => {
            dispatch({
                type: entityInfoActionNames.FETCH_ENTITY_INFO_SUCCESS,
                payload
            });
        })
        .catch(({payload}) => {
            dispatch({
                type: entityInfoActionNames.FETCH_ENTITY_INFO_FAILED
            });
        });
};

export const updateSchool = (school) => (dispatch) => {
    dispatch({ type: entityInfoTabActionNames.UPDATE_ENTITY });

    return http.put({
        url: `${endpoint}/${school.id}`,
        body: school
    }).then(({ payload }) => {
        dispatch({
            type: entityInfoTabActionNames.UPDATE_ENTITY_SUCCESS,
            payload
        });
    })
        .catch(({ payload }) => {
            dispatch({
                type: entityInfoTabActionNames.UPDATE_ENTITY_FAILED
            });
        });
};


