import {connect} from 'react-redux';
import SchoolForm from './SchoolForm';
import {entityInfoTabActionNames} from '../../../actions/actionTypes';
import {fetchSchool,updateSchool} from '../../../store/thunk/schoolInfoThunk';
import withGenericContainer from '../GenericFormComponent';

const mapStateToProps = state => {
    return ({
        school: state.selectedEntity.entity,
        user: state.app.currentUser
    });
};
const mapDispatchToProps = (dispatch) => ({
    fetchSchool: (schoolId) => {
        dispatch(fetchSchool(schoolId));
    },
    updateSchool: (school) =>{
        dispatch(updateSchool(school));
    }
});



const getConnectedComponent=(formComponent)=>{
    return connect (mapStateToProps,mapDispatchToProps)( withGenericContainer()(formComponent));

};

export const SchoolFormContainer = getConnectedComponent(SchoolForm);


