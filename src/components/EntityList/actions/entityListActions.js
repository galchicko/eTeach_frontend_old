import {pushHistoryRouteBySelectedEntity} from '../../../redux/thunk/appThunk';
import { entityListActionNames } from './actionTypes';
//import { eventListActionTypes } from '../../Events/actions/actionTypes';

export const selectEntityAction = (dispatch, payload) => {
    dispatch(pushHistoryRouteBySelectedEntity(payload));
    //dispatch({ type: eventListActionTypes.RESET_FILTER });
    dispatch({ type: entityListActionNames.SELECT_ENTITY, payload });
};