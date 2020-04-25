import {connect} from 'react-redux';
import Lessons from './Lessons';
import {lessonListActionTypes} from '../actions/actionTypes';
import {fetchWorkClassLessonList,fetchStudentLessonList,downloadCSV} from '../store/lessonsThunk';
import { editLessonStatus } from '../store/editLessonStatusThunk';

const mapStateToProps = state => {
    return ({
        lessons: state.lessonList.lessons,
        count: state.lessonList.count,
        isLoading: state.lessonList.isLoading,
        filter: state.lessonsListFilter,
        selectedEntity : state.selectedEntity.entity
    });
};

const mapDispatchToProps = (dispatch) => ({
    fetchWorkClassLessonList: (workclassId) => {
        dispatch(fetchWorkClassLessonList(workclassId));
    },
    fetchStudentLessonList: (workclassId,studentId) => {
        dispatch(fetchStudentLessonList(workclassId,studentId));
    },
    downloadLessons: (entity) => {
        dispatch(downloadCSV(entity.id,entity.name, entity.type));
    },

    handleChangePerPage: (perPage) => {
        dispatch({type: lessonListActionTypes.CHANGE_PER_PAGE, perPage: perPage});
    },
    handleChangePage: (page) => {
        dispatch({type: lessonListActionTypes.CHANGE_CURRENT_PAGE, page: page});
    },
    handleChangeSortedField: (sortedField, sortDirection) => {
        dispatch({type: lessonListActionTypes.CHANGE_SORTED_FIELD, sortedField: sortedField, sortDirection: sortDirection});
    },
    handleChangeFilter: (date, search, status) => {
        dispatch({type: lessonListActionTypes.CHANGE_FILTER, date: date, search: search, status: status});
    },
    editLessonStatus: (newStatus, id, entity) => {
        dispatch(editLessonStatus(newStatus, id, entity));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Lessons);
