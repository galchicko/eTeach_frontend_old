import {connect} from 'react-redux';
import Main from './MainComponent';
import {withRouter} from 'react-router';
import {fetchEntityListAndDefineSelected} from '../EntityList/store/thunk/entityListThunk';
import { clearAllOnRegionChange } from '../../redux/actions/appActions';

const mapDispatchToProps = (dispatch) => ({
    //fetchDeviceInfo: (deviceId, deviceType) => dispatch(fetchDeviceInfo(deviceId, deviceType)),
    fetchEntityListAndDefineSelected: (teacherId, entityType, entityId) => {
        dispatch(fetchEntityListAndDefineSelected(teacherId, entityType, entityId));
    }
});

const mapStateToProps = state => {
    return ({
        user: state.app.currentUser,
        pannelCollapsed: '',//state.selectedDeviceInfo.pannelCollapsed,
        schools: state.entityList.schools,
        entityListLoading: state.entityList.isLoading
    });
};

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(Main);

export default withRouter(MainContainer);
