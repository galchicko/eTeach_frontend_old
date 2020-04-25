import {connect} from 'react-redux';
import LessonList from './LessonList';
import {lessonListActionTypes} from '../actions/actionTypes';

const mapStateToProps = state => {
    return ({
        lessonToExpand: state.lessonList.lessonToExpand,
        isLoading: state.lessonList.isLoading,
        filter: state.lessonsListFilter,
        selectedEntity : state.selectedEntity.entity,
        user: state.app.currentUser
    });
};

const mapDispatchToProps = (dispatch) => ({
    toggleLesson: (id) => {
        dispatch({type: lessonListActionTypes.TOGGLE_LESSON_DESC, payload: id});
    },
    expandLessonFromAlerts: (id) => {
        dispatch({type: lessonListActionTypes.EXPAND_LESSON_FROM_ALERTS, payload: id});
    },
    collapseAllLessons: () => {
        dispatch({type: lessonListActionTypes.COLLAPSE_ALL_LESSONS_DESC});
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LessonList);
