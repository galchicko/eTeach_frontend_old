import {entityListActionNames} from '../../actions/actionTypes';
import http from '../../../../network';
import { getSelectedEntityFromList } from '../../helpers';

export const fetchEntityListAndDefineSelected = (teacherId, entityType, entityId) => (dispatch) => {
    dispatch({ type: entityListActionNames.FETCH_ENTITY_LIST });

    return http.get({ url: `${process.env.REACT_APP_APPS_BE}/teachers/listSchools/${teacherId}`})
        .then(({ payload }) => {

            const selectedEntity = getSelectedEntityFromList(payload, entityType, entityId);
            
            dispatch({type: entityListActionNames.SELECT_ENTITY, payload: selectedEntity});
            dispatch({
                type: entityListActionNames.FETCH_ENTITY_LIST_SUCCESS,
                payload
            });
            dispatch({type: entityListActionNames.EXPAND_ENTITY, payload: selectedEntity});
            
            
        })
        .catch(() => {
            dispatch({
                type: entityListActionNames.FETCH_ENTITY_LIST_FAILED
            });
        });
};