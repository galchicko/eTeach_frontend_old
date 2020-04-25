import {connect} from 'react-redux';
import StudentForm from './StudentForm';
import {fetchStudent,updateStudent} from '../../../store/thunk/studentInfoThunk';
import withGenericContainer from '../GenericFormComponent';

const mapStateToProps = state => {
    return ({
        student: state.selectedEntity.entity,
        user: state.app.currentUser
    });
};
const mapDispatchToProps = (dispatch) => ({
    fetchStudent: (studentId) => {
        dispatch(fetchStudent(studentId));
    },
    updateStudent: (student) =>{
        dispatch(updateStudent(student));
    }
});



const getConnectedComponent=(formComponent)=>{
    return connect (mapStateToProps,mapDispatchToProps)( withGenericContainer()(formComponent));

};

export const StudentFormContainer = getConnectedComponent(StudentForm);


