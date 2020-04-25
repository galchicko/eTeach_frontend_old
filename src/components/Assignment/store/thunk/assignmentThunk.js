import {actionNames} from '../../actions/actionTypes';
import {dateStrToTimestamp} from '../../../../helpers/dateHelper';
import http from '../../../../network';


export const endpoint = `${process.env.REACT_APP_APPS_BE}/assignments`;

export const createAssignment = (assignment) => (dispatch) => {
    dispatch({ type: actionNames.CREATE });

    return http.post({
        url: `${endpoint}`,
        body: assignment
    }).then(({ payload }) => {
        dispatch({
            type: actionNames.CREATE_SUCCESS,
            payload
        });
    })
        .catch(({ payload }) => {
            dispatch({
                type: actionNames.CREATE_FAILED
            });
        });
};

export const createAndPostToStudentAssignment = (assignment,workclassId,studentId) => (dispatch) => {
    dispatch({ type: actionNames.CREATE_AND_POST_TO_STUDENT });
    if(assignment.dueDate){
        assignment.due=dateStrToTimestamp(assignment.dueDate);
    }
    return http.post({
        url: `${endpoint}/new/workclass/${workclassId}/student/${studentId}/createandassign`,
        body: assignment
    }).then(({ payload }) => {
        dispatch({
            type: actionNames.CREATE_AND_POST_TO_STUDENT_SUCCESS,
            payload
        });
    })
        .catch(({ payload }) => {
            dispatch({
                type: actionNames.CREATE_AND_POST_TO_STUDENT_FAILED
            });
        });
};

export const createAndPostToWorkClassAssignment = (assignment, workclassId) => (dispatch) => {
    dispatch({ type: actionNames.CREATE_AND_POST_TO_WORK_CLASS });

    if(assignment.dueDate){
        assignment.due=dateStrToTimestamp(assignment.dueDate);
    }

    return http.post({
        url: `${endpoint}/new/workclass/${workclassId}/createandassign`,
        body: assignment
    }).then(({ payload }) => {
        dispatch({
            type: actionNames.CREATE_AND_POST_TO_WORK_CLASS_SUCCESS,
            payload
        });
    })
        .catch(({ payload }) => {
            dispatch({
                type: actionNames.CREATE_AND_POST_TO_WORK_CLASS_FAILED
            });
        });
};
