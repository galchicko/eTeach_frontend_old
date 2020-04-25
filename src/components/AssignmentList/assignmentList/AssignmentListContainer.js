import {connect} from 'react-redux';
import AssignmentList from './AssignmentList';
import {assignmentListActionTypes} from '../actions/actionTypes';

const mapStateToProps = state => {
    return ({
        assignmentToExpand: state.assignmentList.assignmentToExpand,
        isLoading: state.assignmentList.isLoading,
        filter: state.assignmentsListFilter,
        user: state.app.currentUser
    });
};

const mapDispatchToProps = (dispatch) => ({
    toggleAssignment: (id) => {
        dispatch({type: assignmentListActionTypes.TOGGLE_ASSIGNMENT_DESC, payload: id});
    },
    expandAssignmentFromAlerts: (id) => {
        dispatch({type: assignmentListActionTypes.EXPAND_ASSIGNMENT_FROM_ALERTS, payload: id});
    },
    collapseAllAssignments: () => {
        dispatch({type: assignmentListActionTypes.COLLAPSE_ALL_ASSIGNMENTS_DESC});
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentList);
