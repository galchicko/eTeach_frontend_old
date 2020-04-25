import {entityInfoActionNames} from '../../../../consts/entityActionTypes';
import {entityInfoTabActionNames} from '../../actions/actionTypes';

import http from '../../../../network';


export const endpoint = `${process.env.REACT_APP_APPS_BE}/students`;

export const fetchStudent = (studentId) => (dispatch, getState) => {
    dispatch({type: entityInfoActionNames.FETCH_ENTITY_INFO});

    return http.get({
        url: `${endpoint}/${studentId}`
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

export const updateStudent = (student) => (dispatch) => {
    dispatch({ type: entityInfoTabActionNames.UPDATE_ENTITY });

    return http.put({
        url: `${endpoint}/${student.id}`,
        body: student
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


