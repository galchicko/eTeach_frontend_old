import {connect} from 'react-redux';
import EntityList from './entityList';
import {entityListActionNames} from '../actions/actionTypes';
import { withRouter } from 'react-router';
import { centralTabsTypes } from '../../CentralComponent/store/CentralTabsActionTypes';
import { selectEntityAction } from '../actions/entityListActions';

const mapStateToProps = state => {
    return ({
        schools: state.entityList.schools,
//        searchList: state.deviceList.searchList,
        selectedEntity : state.selectedEntity.entity
    });
};

const mapDispatchToProps = (dispatch, props) => ({
    selectEntity: payload => selectEntityAction(dispatch, payload),
    expandAndSelectEntity: payload=>{
        selectEntityAction(dispatch, payload);
        dispatch({type: entityListActionNames.COLLAPSE_ALL});
        dispatch({type: entityListActionNames.EXPAND_ENTITY,payload});
    },
    setActiveTab: (activeTab) => {
        dispatch({type: centralTabsTypes.SET_ACTIVE_TAB, payload: activeTab});
    },
    onEntityInfoChangedImmediately: (payload) => {
        dispatch({type: entityListActionNames.CHANGE_ENTITY_INFO_IN_LIST, payload});
    },
    onEntityAdd: (payload) => {
        dispatch({type: entityListActionNames.ON_ENTITY_ADD, payload});
    },
    onEntityRemove: (payload) => {
        dispatch({type: entityListActionNames.ON_ENTITY_REMOVE, payload});
    }
});


export default withRouter(connect (mapStateToProps, mapDispatchToProps)(EntityList));
