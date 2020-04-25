import {entityInfoActionNames} from '../../../../consts/entityActionTypes';
import {entityInfoTabActionNames} from '../../actions/actionTypes';

import http from '../../../../network';


export const endpoint = `${process.env.REACT_APP_APPS_BE}/workclasses`;

export const fetchWorkClass = (workclassId) => (dispatch, getState) => {
    dispatch({type: entityInfoActionNames.FETCH_ENTITY_INFO});

    return http.get({
        url: `${endpoint}/${workclassId}`
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

export const updateWorkClass = (workclass) => (dispatch) => {
    dispatch({ type: entityInfoTabActionNames.UPDATE_ENTITY });

    return http.put({
        url: `${endpoint}/${workclass.id}`,
        body: workclass
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


