import {connect} from 'react-redux';
import WorkClassForm from './WorkClassForm';
import {fetchWorkClass,updateWorkClass} from '../../../store/thunk/workclassInfoThunk';
import withGenericContainer from '../GenericFormComponent';

const mapStateToProps = state => {
    return ({
        workclass: state.selectedEntity.entity,
        user: state.app.currentUser
    });
};
const mapDispatchToProps = (dispatch) => ({
    fetchWorkClass: (workclassId) => {
        dispatch(fetchWorkClass(workclassId));
    },
    updateWorkClass: (workclass) =>{
        dispatch(updateWorkClass(workclass));
    }
});



const getConnectedComponent=(formComponent)=>{
    return connect (mapStateToProps,mapDispatchToProps)( withGenericContainer()(formComponent));

};

export const WorkClassFormContainer = getConnectedComponent(WorkClassForm);


