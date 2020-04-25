import {connect} from 'react-redux';
import PostAssignmentBtn from './PostAssignmentBtn';
import {createAndPostToStudentAssignment,createAndPostToWorkClassAssignment} from '../store/thunk/assignmentThunk';

const mapStateToProps = state => {
    return ({
        selectedEntity: state.selectedEntity.entity,
        user: state.app.currentUser
    });
};
const mapDispatchToProps = (dispatch) => ({
    createAndPostToStudentAssignment: (assignment,workclassId,studentId) => {
        dispatch(createAndPostToStudentAssignment(assignment,workclassId,studentId));
    },
    createAndPostToWorkClassAssignment: (assignment,workclassId) => {
        dispatch(createAndPostToWorkClassAssignment(assignment,workclassId));
    },
});

export default connect (mapStateToProps,mapDispatchToProps)(PostAssignmentBtn);
