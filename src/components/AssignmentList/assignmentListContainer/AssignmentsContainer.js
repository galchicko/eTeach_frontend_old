import {connect} from 'react-redux';
import Assignments from './Assignments';
import {assignmentListActionTypes} from '../actions/actionTypes';
import {fetchAssignmentList,downloadCSV} from '../store/assignmentsThunk';
import { editAssignmentStatus } from '../store/editAssignmentStatusThunk';

const mapStateToProps = state => {
    return ({
        assignments: state.assignmentList.assignments,
        count: state.assignmentList.count,
        isLoading: state.assignmentList.isLoading,
        filter: state.assignmentsListFilter,
        selectedEntity : state.selectedEntity.entity
    });
};

const mapDispatchToProps = (dispatch) => ({
    fetchAssignmentList: (entity) => {
        dispatch(fetchAssignmentList(entity.id, entity.type));
    },
    downloadAssignments: (entity) => {
        dispatch(downloadCSV(entity.id,entity.name, entity.type));
    },

    handleChangePerPage: (perPage) => {
        dispatch({type: assignmentListActionTypes.CHANGE_PER_PAGE, perPage: perPage});
    },
    handleChangePage: (page) => {
        dispatch({type: assignmentListActionTypes.CHANGE_CURRENT_PAGE, page: page});
    },
    handleChangeSortedField: (sortedField, sortDirection) => {
        dispatch({type: assignmentListActionTypes.CHANGE_SORTED_FIELD, sortedField: sortedField, sortDirection: sortDirection});
    },
    handleChangeFilter: (date, search, status) => {
        dispatch({type: assignmentListActionTypes.CHANGE_FILTER, date: date, search: search, status: status});
    },
    editAssignmentStatus: (newStatus, id, entity) => {
        dispatch(editAssignmentStatus(newStatus, id, entity));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Assignments);
