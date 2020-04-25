import {eventListActionTypes} from '../actions/actionTypes';
import http from '../../../network';
import {fetchEventList} from '../store/eventsThunk';

export const editEventStatus = (newStatus, eventId, entity) => (dispatch, getState) => {
    dispatch({type: eventListActionTypes.EDIT_EVENT_STATUS});

    return http.put({
        url: `${process.env.REACT_APP_APPS_BE}/events/${eventId}`,
        body: {status: newStatus}
    })
        .then(() => {
            dispatch({
                type: eventListActionTypes.EDIT_EVENT_STATUS_SUCCESS
            });
            dispatch(fetchEventList(entity.id, entity.type));
        })
        .catch(() => {
            dispatch({
                type: eventListActionTypes.EDIT_EVENT_STATUS_FAILED
            });
        });
};
