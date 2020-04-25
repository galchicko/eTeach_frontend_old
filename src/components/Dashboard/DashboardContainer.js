import {connect} from 'react-redux';
import DashboardComponent from './DashboardComponent';
import {withRouter} from 'react-router';
import {fetchEntityListAndDefineSelected} from '../EntityList/store/thunk/entityListThunk';
import {EntityTypes} from '../../consts/entityTypes';

const mapDispatchToProps = (dispatch) => ({
    fetchEntityListAndDefineSelected: (teacherId) => {
        dispatch(fetchEntityListAndDefineSelected(teacherId,EntityTypes.ALL,null));
    },
});

const mapStateToProps = state => {
    return ({
        user: state.app.currentUser
    });
};

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);

export default withRouter(DashboardContainer);
