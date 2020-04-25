import {assignmentListActionTypes} from '../actions/actionTypes';
import http from '../../../network';
import {fetchAssignmentList} from '../store/assignmentsThunk';

export const editAssignmentStatus = (newStatus, eventId, entity) => (dispatch, getState) => {
    dispatch({type: assignmentListActionTypes.EDIT_ASSIGNMENT_STATUS});

    return http.put({
        url: `${process.env.REACT_APP_APPS_BE}/assignments/${eventId}`,
        body: {status: newStatus}
    })
        .then(() => {
            dispatch({
                type: assignmentListActionTypes.EDIT_ASSIGNMENT_STATUS_SUCCESS
            });
            dispatch(fetchAssignmentList(entity.id, entity.type));
        })
        .catch(() => {
            dispatch({
                type: assignmentListActionTypes.EDIT_ASSIGNMENT_STATUS_FAILED
            });
        });
};
