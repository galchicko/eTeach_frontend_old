import {connect} from 'react-redux';
import CentralComponent from './CentralComponent';
import {centralTabsTypes} from './store/CentralTabsActionTypes';
import {fetchDevicesTimeLine} from './store/CentralComponentThunk';
import { centralComponentTypes } from './store/CentralComponentActionTypes';


const mapStateToProps = state => {
    return ({
        tabs: state.centralComponent.tabs,
        activeTab: state.centralComponent.activeTab,
        selectedEntity : state.selectedEntity.entity,
        inProgress: state.centralComponent.inProgress,
        currentUser: state.app.currentUser
    });
};
const mapDispatchToProps = (dispatch) => ({
    setActiveTab: (activeTab) => {
        dispatch({type: centralTabsTypes.SET_ACTIVE_TAB, payload: activeTab});
    },
    setTabs: (activeTab) => {
        dispatch({type: centralTabsTypes.SET_AVAILABLE_TABS, payload: activeTab});
    }
});

export default connect (mapStateToProps,mapDispatchToProps)(CentralComponent);
